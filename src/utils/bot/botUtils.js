require('dotenv').config();

module.exports = class BotUtils {

    static getCurator (interaction) {
        return interaction.member.roles.cache.find(role => role.name.toLowerCase() === process.env.CURATOR_ROLE_NAME.toLowerCase());
    }

    static getSeniorCurator (interaction) {
        return interaction.member.roles.cache.find(role => role.name.toLowerCase() === process.env.SENIOR_CURATOR_ROLE_NAME.toLowerCase());
    }

    static getAdmimnistrador (interaction) {
        return interaction.member.roles.cache.find(role => role.name.toLowerCase() === process.env.ADMINISTRATOR_ROLE_NAME.toLowerCase());
    }

    static subtractDays(date, days) {
        date.setDate(date.getDate() - days);
      
        return date;
    }

    static addDays(date, days) {
        date.setDate(date.getDate() + days);
      
        return date;
    }

    static computeDate(date) {
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });
        
        return day + "/" + month + "/" + year;
    }
}