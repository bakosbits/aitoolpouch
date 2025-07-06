import { useEffect } from "react";
import { useRouter } from "next/router";

// Example map of slug → affiliate URLs
const AFFILIATE_MAP = {
"make": "https://www.make.com",
"bardeen": "https://www.bardeen.ai",
"levity": "https://www.levity.ai",
"zapier-ai": "https://www.zapier.com",
"relay.app": "https://www.relay.app",
"tango": "https://www.tango.us",
"navattic": "https://www.navattic.com",
"consensus": "https://www.goconsensus.com",
"vreprise": "https://www.reprise.com",
"lavender": "https://www.lavender.ai",
"dall·e": "https://www.openai.com",
"leonardo-ai": "https://www.leonardo.ai",
"stockimg-ai": "https://www.stockimg.ai",
"runway": "https://www.runwayml.com",
"midjourney": "https://www.midjourney.com",
"bubble": "https://www.bubble.io",
"pory": "https://www.pory.io",
"softr": "https://www.softr.io",
"glide": "https://www.glideapps.com",
"tilda": "https://www.tilda.cc",
"smartwriter": "https://www.smartwriter.ai",
"adcreative.ai": "https://www.adcreative.ai",
"predis.ai": "https://www.predis.ai",
"surfer-seo": "https://www.surferseo.com",
"ocoya": "https://www.ocoya.com",
"github-copilot": "https://www.github.com",
"tabnine": "https://www.tabnine.com",
"cody-by-sourcegraph": "https://www.sourcegraph.com",
"mutable-ai": "https://www.mutable.ai",
"writesonic": "https://www.writesonic.com",
"copy.ai": "https://www.copy.ai",
"scalenut": "https://www.jasper.ai",
"sudowrite": "https://www.sudowrite.com/?via=14830rb",
"notion-ai": "https://www.notion.so",
"glass-ai": "https://www.glass.health",
"nuance-dragon-medical-one": "https://www.nuance.com",
"klarity": "https://www.klarity.health",
"kensho-scribe": "https://www.kensho.com",
"numerai-signals": "https://www.deepscribe.ai",
"doximity-docsgpt": "https://www.doximity.com",
"yseop-compose": "https://www.yseop.com",
"deepscribe": "https://www.deepscribe.ai",
"alphasense": "https://www.alpha-sense.com",
"abridge": "https://www.abridge.com",
"carrd": "https://www.carrd.co",
"tally.so": "https://www.tally.so",
"framer": "https://www.framer.com",
"outseta": "https://www.outseta.com",
"typedream": "https://www.typedream.com",
"lemon-squeezy": "https://www.lemonsqueezy.com",
"fathom-analytics": "https://www.fathom.video",
"beehiiv": "https://www.beehiiv.com",
"n8n": "https://www.n8n.io",
"gong": "https://www.gong.io",
"demodesk": "https://www. demodesk.com",
"adobe-firefly": "https://www.firefly.adobe.com",
"kittl": "https://www.kittl.com",
"webflow-with-ai": "https://www.webflow.com",
"draftbit": "https://www.draftbit.com",
"flick": "https://www.flick.social",
"anyword": "https://www.anyword.com",
"postwise": "https://www.postwise.ai",
"taplio": "https://www.taplio.com",
"codiumai": "https://www.codium.ai",
"cursor": "https://www.cursor.sh",
"uizard": "https://www.uizard.io",
"pipedream": "https://www.pipedream.com",
"krea": "https://www.krea.ai",
"vtana": "https://www.tana.inc",
"reflect": "https://www.reflect.app",
"sunsama": "https://www.sunsama.com",
"supernotes": "https://www.supernotes.app",
"rise": "https://www.rise.calendar",
"motion": "https://www.usemotion.com",
"akiflow": "https://www.akiflow.com",
"reclaim.ai": "https://www.reclaim.ai",
"centered": "https://www.centered.app",
"habitica": "https://www.habitica.com",
"clio-duo": "https://www.clio.com",
"cocounsel": "https://www.legal.thomsonreuters.com",
"harvey-ai": "https://www.harvey.ai",
"smith.ai": "https://www.smith.ai",
"darrow": "https://www.darrow.ai",
"quickbooks-ai-agents": "https://www.quickbooks.intuit.com",
"google-workspace-ai": "https://www.workspace.google.com",
"microsoft-365-copilot": "https://www.microsoft.com",
"hubspot": "https://www.hubspot.com",
"canva": "https://www.canva.com",
"nice-cxone-mpower": "https://www.nice.com",
"forethought": "https://www.forethought.ai",
"aisera": "https://www.aisera.com",
"help-scout": "https://www.helpscout.com",
"zendesk-ai": "https://www.zendesk.com",
"exaforce": "https://www.exaforce.ai",
"cynomi": "https://www.cynomi.com",
"endor-labs": "https://www.endorlabs.io",
"mimic": "https://www.mimic.ai",
"mitiga": "https://www.mitiga.io",
"oligo-security": "https://www.oligosecurity.com",
"pictory": "https://www.pictory.ai",
"heygen": "https://www.heygen.com",
"zoho-books": "https://www.zoho.com",
"tidio": "https://www.tidio.com",
"freshchat": "https://www.freshchat.com",
"regie.ai": "https://www.regie.ai",
"avoma": "https://www.avoma.com",
"crystal": "https://www.crystal.com",
"apollo.io": "https://www.apollo.io",
};

export default function RedirectPage() {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (!slug) return;

        const url = AFFILIATE_MAP[slug];

        if (url) {
            // Track it in Plausible
            if (window.plausible) {
                window.plausible("Affiliate Redirect", {
                    props:{ tool:slug },
                });
            }

            // Delay just a tick so tracking fires
            setTimeout(() => {
                window.location.href = url;
            }, 100);
        } else {
            // Handle unknown slug
            router.replace("/404");
        }
    }, [slug, router]);

    return (
        <div className="text-white text-center py-20">
            Redirecting you to {slug}...
        </div>
    );
}
