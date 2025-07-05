import { useEffect } from "react";
import { useRouter } from "next/router";

// Example map of slug → affiliate URLs
const AFFILIATE_MAP = {
    make: "https://www.make.com",
    bardeen: "https://www.bardeen.ai",
    levity: "https://www.levity.ai",
    "zapier-ai": "https://www.zapier.com",
    "relay.app": "https://www.relay.app",
    tango: "https://www.tango.us",
    navattic: "https://www.navattic.com",
    consensus: "https://www.goconsensus.com",
    reprise: "https://www.reprise.com",
    lavender: "https://www.lavender.ai",
    "dall·e": "https://openai.com/dall-e",
    "leonardo-ai": "https://www.leonardo.ai",
    "stockimg-ai": "https://www.stockimg.ai",
    runway: "https://www.runwayml.com",
    midjourney: "https://www.midjourney.com",
    bubble: "https://www.bubble.io",
    pory: "https://www.pory.io",
    softr: "https://www.softr.io",
    glide: "https://www.glideapps.com",
    tilda: "https://www.tilda.cc",
    smartwriter: "https://smartlead.ai/?via=rab80603",
    "adcreative.ai": "https://free-trial.adcreative.ai/v1vjtjbg8u4j",
    "predis.ai": "https://www.predis.ai",
    "surfer-seo": "https://www.surferseo.com",
    ocoya: "https://www.ocoya.com/?via=80603rb",
    "github-copilot": "https://github.com/features/copilot",
    tabnine: "https://www.tabnine.com",
    "cody-by-sourcegraph": "https://sourcegraph.com/cody",
    "mutable-ai": "https://www.mutable.ai",
    writesonic: "https://www.writesonic.com",
    "copy.ai": "https://www.copy.ai",
    scalenut: "https://scalenut.com/?fpr=14830rb",
    sudowrite: "https://www.sudowrite.com/?via=14830rb",
    "notion-ai": "https://www.notion.so/product/ai",
    "glass-ai": "https://www.glass.health",
    "nuance-dragon-medical-one": "https://www.nuance.com/healthcare.html",
    klarity: "https://www.klarity.health",
    "kensho-scribe": "https://www.kensho.com/products/scribe",
    "numerai-signals": "https://www.deepscribe.ai",
    "doximity-docsgpt": "https://www.doximity.com/doxgpt",
    "yseop-compose": "https://www.yseop.com/solutions/compose",
    deepscribe: "https://www.deepscribe.ai",
    alphasense: "https://www.alpha-sense.com",
    abridge: "https://www.abridge.com",
    carrd: "https://www.carrd.co",
    "tally.so": "https://tally.so/",
    framer: "https://www.framer.com",
    outseta: "https://www.outseta.com",
    typedream: "https://www.typedream.com",
    "lemon-squeezy": "https://www.lemonsqueezy.com/",
    "fathom-analytics": "https://usefathom.com/ref/ETU4IM",
    beehiiv: "https://www.beehiiv.com",
    n8n: "https://n8n.io/",
    gong: ",,https://www.gong.io/",
    demodesk: ",,https://demodesk.com/",
    "adobe-firefly": "https://firefly.adobe.com/",
    kittl: "https://www.kittl.com/",
    "webflow-with-ai": "https://webflow.com/",
    draftbit: "https://draftbit.com/",
    flick: "https://www.flick.social/",
    anyword: "https://www.anyword.com/",
    postwise: "https://www.postwise.ai",
    taplio: "https://www.taplio.com",
    codiumai: "https://www.codium.ai",
    cursor: "https://www.cursor.sh",
    uizard: "https://www.uizard.io",
    pipedream: "http://pipedream.com/?via=303rb",
    krea: "https://www.krea.ai",
    tana: "https://tana.inc",
    reflect: "https://reflect.app",
    sunsama: "https://sunsama.com",
    supernotes: "https://supernotes.app",
    rise: "https://www.riseworks.io/referral?referral=bVWWkDz",
    motion: "https://usemotion.com",
    akiflow: "https://akiflow.com",
    "reclaim.ai": "https://reclaim.ai",
    centered: "https://centered.app",
    habitica: "https://habitica.com",
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
                    props: { tool: slug },
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
