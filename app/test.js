const Zapper = require('./zapper')
const zapper = new Zapper()

const cases = [
    {
        name: 'a lot of params',
        in: 'https://foo.com?s=keepThisOne&name=xxx&fbclid=xxx&gclid=xxx&gclsrc=xxx&utm_content=xxx&utm_term=xxx&utm_campaign=xxx&utm_medium=xxx&utm_source=xxx&utm_id=xxx&_ga=xxx&mc_cid=xxx&mc_eid=xxx&_bta_tid=xxx&_bta_c=xxx&trk_contact=xxx&trk_msg=xxx&trk_module=xxx&trk_sid=xxx&gdfms=xxx&gdftrk=xxx&gdffi=xxx&_ke=xxx&redirect_log_mongo_id=xxx&redirect_mongo_id=xxx&sb_referer_host=xxx&mkwid=xxx&pcrid=xxx&ef_id=xxx&s_kwcid=xxx&msclkid=xxx&dm_i=xxx&epik=xxx&pk_campaign=xxx&pk_kwd=xxx&pk_keyword=xxx&piwik_campaign=xxx&piwik_kwd=xxx&piwik_keyword=xxx&mtm_campaign=xxx&mtm_keyword=xxx&mtm_source=xxx&mtm_medium=xxx&mtm_content=xxx&mtm_cid=xxx&mtm_group=xxx&mtm_placement=xxx&matomo_campaign=xxx&matomo_keyword=xxx&matomo_source=xxx&matomo_medium=xxx&matomo_content=xxx&matomo_cid=xxx&matomo_group=xxx&matomo_placement=xxx&hsa_cam=xxx&hsa_grp=xxx&hsa_mt=xxx&hsa_src=xxx&hsa_ad=xxx&hsa_acc=xxx&hsa_net=xxx&hsa_kw=xxx&hsa_tgt=xxx&hsa_ver=xxx',
        out: 'https://foo.com?s=keepThisOne',
    },
    {
        name: 'in html',
        in: '<a href="https://example.com/url" target="_blank">Source</a>',
        out: '<a href="https://example.com/url" target="_blank">Source</a>',
    },
    {
        name: 'in html with params',
        in: '<a href="https://example.com/url?foo=xxx&bar=sdojbafis" target="_blank">Source</a>',
        out: '<a href="https://example.com/url?foo=xxx&bar=sdojbafis" target="_blank">Source</a>',
    },
    {
        name: 'markdown list',
        in: '- [link description](http://example.com?foo=ahoy)',
        out: '- [link description](http://example.com?foo=ahoy)',
    },
    {
        name: 'markdown link',
        in: '[link description](http://example.com?fbclid=xxx&gclid=xxx)',
        out: '[link description](http://example.com)',
    },
    {
        name: 'multiple links',
        in: '[link description](http://example.com?keepThis=xxx&gclid=xxx) [link description](http://exampletwo.com)',
        out: '[link description](http://example.com?keepThis=xxx) [link description](http://exampletwo.com)',
    },
]

cases.forEach((c, i) => {
    const output = zapper.zap(c.in)
    if(output !== c.out)
    {
        console.log(`❌️ ${c.name}`)
        console.log(c.out + ' <== Expected')
        console.log(output + ' <== Actual')
    } else {
        console.log(`✅️ ${c.name}`)
    }
})