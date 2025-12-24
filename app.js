//test3
const SUPABASE_URL = 'https://daxmtbkhwphopmuxzyow.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_3Ty9dgqnqaiCWV4Fm3NKzg_KtwJYva3'

const container = document.getElementById('data');

async function loadData() {
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/char-data?select=text,created_at&order=created_at.asc`,
            {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
                },
                cache: 'no-store'
            }
        )

        
        const rows = await res.json()
console.log('Supabase response:', rows)
        container.innerHTML = ''

        for (const row of rows) {
            let obj
            try {
                obj = JSON.parse(row.text)
            } catch {
                continue
            }

            const values = Object.entries(obj).filter(([k]) => k !== 'source')
            let valid = true

            for (const [, v] of values) {
                if (typeof v !== 'number' || Number.isNaN(v)) {
                    valid = false
                    break
                }
            }

            if (!valid) continue

            const div = document.createElement('div')
            div.className = 'row'
            div.textContent =
                `source=${obj.source} | lvl=${obj.lvl} | exp=${obj.exp}`

            container.appendChild(div)
        }
    } catch (err) {
        console.error(err)
    }
}

loadData();
setInterval(loadData, 5000);
