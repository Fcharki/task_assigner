    function getLines(id) {
      return document.getElementById(id).value
        .split('\n').map(s => s.trim()).filter(Boolean);
    }

    function initials(name) {
      return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function assign() {
      const names = getLines('names');
      const parts = getLines('parts');
      const perPerson = parseInt(document.getElementById('perPerson').value);
      const errEl = document.getElementById('error');
      errEl.style.display = 'none';
      errEl.textContent = '';

      if (!names.length) { showError('Please enter at least one name.'); return; }
      if (!parts.length) { showError('Please enter at least one part.'); return; }

      const needed = names.length * perPerson;
      if (needed > parts.length) {
        showError(`Not enough parts! You need ${needed} parts for ${names.length} people × ${perPerson} each, but only have ${parts.length}.`);
        return;
      }

      const shuffled = shuffle(parts).slice(0, needed);
      const list = document.getElementById('resultsList');
      list.innerHTML = '';

      names.forEach((name, i) => {
        const assigned = shuffled.slice(i * perPerson, (i + 1) * perPerson);
        const row = document.createElement('div');
        row.className = 'result-row';
        row.style.animationDelay = `${i * 0.05}s`;
        row.innerHTML = `
          <div class="avatar">${initials(name)}</div>
          <div class="result-info">
            <div class="result-name">${name}</div>
            <div class="badges">${assigned.map(p => `<span class="badge">${p}</span>`).join('')}</div>
          </div>`;
        list.appendChild(row);
      });

      document.getElementById('resultCount').textContent = `${names.length} people`;
      document.getElementById('resultsCard').style.display = 'block';
    }

    function showError(msg) {
      const el = document.getElementById('error');
      el.textContent = msg;
      el.style.display = 'block';
    }

    function reset() {
      document.getElementById('resultsCard').style.display = 'none';
      document.getElementById('error').style.display = 'none';
    }