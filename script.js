(function () {
  const hideStyle = document.createElement('style');
  hideStyle.textContent = '.adora-hide { opacity: 0 !important }';
  document.documentElement.appendChild(hideStyle);
  const originalHtmlClass = document.documentElement.className;
  document.documentElement.className = originalHtmlClass + ' adora-hide';
  setTimeout(() => {document.documentElement.className = originalHtmlClass}, 2000);
  (function () {
    const currentURL = new URL(window.location.href);
    const options = {};
    const payload = {
      n: `glov-debug-${crypto.randomUUID()}`,
      u: currentURL.href,
      d: currentURL.hostname,
      r: document.referrer,
      w: window.innerWidth,
      p: options && options.props ? JSON.stringify(options.props) : undefined,
      c: document.cookie,
      wdl: window.dataLayer || [],
    };

    const req = new XMLHttpRequest();
    req.open(
      'POST',
      'https://us-central1-aerobic-guide-345806.cloudfunctions.net/glovPersonalization/api/logResponse',
      true
    );
    req.setRequestHeader('Content-Type', 'text/plain');
    req.send(JSON.stringify(payload));
    // eslint-disable-next-line functional/immutable-data
    req.onreadystatechange = () => {
      if (req.readyState !== 4) return;
      if (options && options.callback) {
        options.callback();
      }
      console.log('glov-tracker:', req.responseText);
    };
  })();

  (async function applyTreatments() {
    const updateGaScript = (treatmentList) => {
      const gaScriptIndex = treatmentList.findIndex(
        (t) => t.id === 0 && t.name === 'inject ga script'
      );
      if (gaScriptIndex === -1) return;

      const treatmentIds = treatmentList.reduce((ids, treatment) => {
        if (treatment.id !== 0) ids.push(treatment.id.toString());
        return ids;
      }, []);
      if (treatmentIds.length === 0) return;

      const gaScript = treatmentList[gaScriptIndex];
      let scriptValue = gaScript.apply_on_action.value;
      scriptValue = scriptValue.replace('NA', treatmentIds);
      gaScript.apply_on_action.value = scriptValue;
      treatmentIds[gaScriptIndex] = gaScript;
    };

    const transformer = function transformer(treatment) {
      const { apply_on_selector, apply_on_action } = treatment;
      const { operator, attribute, value, move_selector_1, move_selector_2 } =
        apply_on_action;
      if (operator === 'remove') {
        console.log('Removing: ', apply_on_selector);
        $(apply_on_selector).remove();
      }
      if (operator === 'setattribute') {
        console.log('Setting attribute: ', attribute, value);
        switch (attribute) {
          case 'src':
            $(apply_on_selector).css('content', `url(${value.trim()})`);
            break;
          case 'style':
            const property = value.split(':');
            $(apply_on_selector).css(property[0].trim(), property[1].trim());
            break;
          default:
            break;
        }
      }
      if (operator === 'before') {
        console.log('Inserting before: ', value);
        $(apply_on_selector).before(value);
      }
      if (operator === 'replace') {
        console.log('Replacing: ', value);
        $(apply_on_selector).replaceAll(value);
      }
      if (operator === 'swap') {
        console.log('Swapping: ', move_selector_1, move_selector_2);
        const n1 = document.querySelector(move_selector_1);
        const n2 = document.querySelector(move_selector_2);
        swapNodes(n1, n2);
      }
      if (operator === 'injectscript') {
        console.log('Injecting script: ', value);
        $(apply_on_selector).append(`<script>${value}</script>`);
      }
    };
    const swapNodes = function swapNodes(n1, n2) {
      var p1 = n1.parentNode;
      var p2 = n2.parentNode;
      var i1, i2;

      if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;

      for (var i = 0; i < p1.children.length; i++) {
        if (p1.children[i].isEqualNode(n1)) {
          i1 = i;
        }
      }
      for (var i = 0; i < p2.children.length; i++) {
        if (p2.children[i].isEqualNode(n2)) {
          i2 = i;
        }
      }

      if (p1.isEqualNode(p2) && i1 < i2) {
        i2++;
      }
      p1.insertBefore(n2, p1.children[i1]);
      p2.insertBefore(n1, p2.children[i2]);
    };
    const extractCookieIdentifier = (cookieString, cookieName) => {
      if (!cookieString) {
        return null;
      }

      const parsed = cookieString
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc, v) => {
          if (v[0] && v[1]) {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
              v[1].trim()
            );
          }
          return acc;
        }, {});

      let identifier = parsed[cookieName];
      if (!identifier) {
        return null;
      }
      if (cookieName === '_ga') {
        // extract unique identifier from cookie
        const identifierIndex = 2;
        identifier = identifier.split('.')[identifierIndex];
      }
      return identifier;
    };
    const parseCookie = async (identifier) => {
      if (!identifier) {
        return -1;
      }
      // encode string to an array of 8-bit unsigned integer values
      const cookieEncoded = new TextEncoder().encode(identifier);

      // hash the encoded cookie into a buffer
      const hashBuffer = await crypto.subtle.digest('SHA-1', cookieEncoded);

      // convert buffer to byte array
      const hashArray = Array.from(new Uint8Array(hashBuffer));

      // convert bytes to hex string
      const cookieHash = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // Map the cookie hash to a number between 0 -> 99, this number is the onRation
      const hashNumber = parseInt(cookieHash, 16);

      return hashNumber % 100;
    };

    const treatmentApplicator = (treatments) => {
      if (!window.jQuery) {
        setTimeout(function () {
          treatmentApplicator(treatments);
        }, 10);
      } else {
        for (const treatment of treatments) {
          transformer(treatment);
        }
        return;
      }
    };

    // Apply treatments
    try {
      const identifier = extractCookieIdentifier(document.cookie, '_ga');
      console.log('Found cookie identifier: ', identifier);
      const cookiePct = await parseCookie(identifier);
      console.log('DEBUG cookie pct:', cookiePct)
      if (cookiePct < 1) {
        throw new Error('Control group: no treatments applied')
      }
      const cachedTreatments = localStorage.getItem(
        identifier.toString() + window.location.href
      );
      let treatments = JSON.parse(cachedTreatments);
      if (!cachedTreatments) {
        const personalizedConfig = await fetch(
          'https://us-central1-aerobic-guide-345806.cloudfunctions.net/glovPersonalization/api/processRequest',
          {
            method: 'POST',
            body: JSON.stringify({
              requestURL: window.location.href,
              requestingID: identifier,
              cookiePct,
            }),
            headers: {
              Authorization: 'Bearer temp-token',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!personalizedConfig.ok) {
          console.error(
            'Failed to fetch personalizedConfig: ',
            personalizedConfig.statusText
          );
        }

        const treatmentsJSON = await personalizedConfig.json();
        console.log('Treatments: ', treatmentsJSON.SVC_TREATMENTS);
        treatments = treatmentsJSON.SVC_TREATMENTS;
        localStorage.setItem(
          identifier.toString() + window.location.href,
          JSON.stringify(treatments)
        );
      }
      updateGaScript(treatments);
      treatmentApplicator(treatments);
      document.documentElement.className = originalHtmlClass;
    } catch (err) {
      document.documentElement.className = originalHtmlClass;
      console.log('Adora error: ', err.message)
    }
  })();
})();
