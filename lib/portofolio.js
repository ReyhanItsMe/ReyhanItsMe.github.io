/**
 * lib/portofolio.js
 * Memetakan data dari environment ke variabel portofolioData.
 */

window.portofolioData = {
    stats: window.ENV.STATS || [],
    
    services: window.ENV.SERVICES || [],
    
    projects: window.ENV.PROJECTS || [],
    
    skills: window.ENV.SKILLS || {},
    
    contact: {
        whatsapp: window.ENV.URL_WHATSAPP || "6282117256472",
        message: window.ENV.WA_DEFAULT_MSG || "Halo!"
    }
};
