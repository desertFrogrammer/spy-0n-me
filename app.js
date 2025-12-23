const url = './data.ndjson';
const container = document.getElementById('data');

async function loadData() {
    try {
        const res = await fetch(url + '?t=' + Date.now(), { cache: 'no-store' });
        const text = await res.text();

        container.innerHTML = '';

        const lines = text.trim().split('\n');

        for (const line of lines) {
            if (!line) continue;

            let obj;
            try {
                obj = JSON.parse(line);
            } catch {
                continue;
            }

            // универсальная проверка
            const values = Object.entries(obj).filter(([k]) => k !== 'source');
            let valid = true;

            for (const [, v] of values) {
                if (typeof v !== 'number' || Number.isNaN(v)) {
                    valid = false;
                    break;
                }
            }

            if (!valid) continue;

            const div = document.createElement('div');
            div.className = 'row';
            div.textContent =
                `source=${obj.source} | lvl=${obj.lvl} | exp=${obj.exp}`;

            container.appendChild(div);
        }
    } catch (err) {
        console.error(err);
    }
}

loadData();
setInterval(loadData, 5000);