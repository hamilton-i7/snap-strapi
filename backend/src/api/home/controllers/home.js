"use strict";

/**
 *  home controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::home.home", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::home.home", {
      ...query,
      populate: {
        menu: {
          populate: {
            logo: true,
            menuIcon: true,
            closeMenuIcon: true,
            links: {
              populate: {
                icon: true,
              },
            },
          },
        },
        clients: true,
        imageDesktop: true,
        imageMobile: true,
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
