const REMOVE = [
    "_bta_c",
    "_bta_tid",
    "_ga",
    "_hsenc",
    "_hsmi",
    "_ke",
    "_openstat",
    "dm_i",
    "ef_id",
    "epik",
    "fbclid",
    "gclid",
    "gclsrc",
    "gdffi",
    "gdfms",
    "gdftrk",
    "hsa_",
    "igshid",
    "matomo_",
    "mc_",
    "mkwid",
    "msclkid",
    "mtm_",
    "name",
    "ns_",
    "oly_anon_id",
    "oly_enc_id",
    "otc",
    "pcrid",
    "piwik_",
    "pk_",
    "rb_clickid",
    "redirect_log_mongo_id",
    "redirect_mongo_id",
    "ref",
    "s_kwcid",
    "sb_referer_host",
    "soc_src",
    "soc_trk",
    "spm",
    "sr_",
    "srcid",
    "stm_",
    "trk_",
    "utm_",
    "vero_",
]

// https://stackoverflow.com/a/8943487
var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

class Zapper {
    zap(text) {
        const urls = text.match(urlPattern)
        if (urls === null) return null
        let formatted = text
        urls.forEach(original => {
            const [main, rawParams] = original.split('?')
            if (!rawParams) return
            let params = rawParams.split('&').filter(p => {
                let keep = true
                REMOVE.forEach(r => {
                    if (!keep) return
                    if (p.startsWith(r)) {
                        keep = false
                    }
                })
                return keep
            })

            params = params.join('&')
            const changed = `${main}${params ? `?${params}` : ''}`
            formatted = formatted.replace(original, changed)
        })

        return formatted
    }
}

module.exports = Zapper;