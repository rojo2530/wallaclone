'use strict';

const Anuncio = require('../models/Anuncio');
const getPriceFilter = require('../lib/aux');
const config = require('../lib/config');
const createTask = require('../rabbitmq/publisher');

const anunciosApiController = () => {
  return {
    /**
     * GET apiv1/anuncios
     */
    index: async (req, res, next) => {
      try {
        const start =
          typeof req.query.start === 'undefined'
            ? config.START
            : parseInt(req.query.start);
        const limit =
          typeof req.query.limit === 'undefined'
            ? config.LIMIT
            : parseInt(req.query.limit);
        const filter = {};
        const { tag, type, name, sort, price, user, fields } = req.query;

        //Si buscamos por nombre, no va a ser por nombre exacto sino que empiece por ese nombre, omitiendo mayúsculas
        if (name) filter.name = new RegExp('^' + name, 'i');

        if (typeof type !== 'undefined') filter.type = type;

        if (user) filter.user = user;

        if (tag) filter.tags = tag;

        if (typeof price !== 'undefined') filter.price = getPriceFilter(price);

        const countTotal = await Anuncio.count(filter);

        const totalPages = Math.ceil(countTotal / limit); 

        const anuncios = await Anuncio.list({
          filter: filter,
          start,
          limit,
          sort,
          fields,
        });

        res.json({ sucess: true, totalPages , countTotal, count:anuncios.length, results: anuncios });
        return;
      } catch (err) {
        next(err);
        return;
      }
    },
    /**
     * POST apiv1/anuncios
     */
    post: async (req, res, next) => {
      try {
        const data = req.body;

        //Para evitar tags duplicados
        data.tags = [...new Set(data.tags)];
        const anuncio = new Anuncio(data);
        const anuncioSaved = await anuncio.save();
        //mandar a rabbitmq
        res.json({ sucess: true, result: anuncioSaved });
      } catch (err) {
        console.log('Error', err);
        next(err);
      }
    },
    /**
     * POST /apiv1/anuncios/uploadfile
     */

    uploadFile: async (req, res, next) => {
      try {
        const file = req.file;
        if (!file) {
          const error = new Error('Please upload a file');
          error.status = 400;
          return next(error);
        }
        res.json({ sucess: true, result: '/images/anuncios/' + file.filename });
        // createTask({
        //   texto: 'Create thumbnail for  ' + req.file.originalname + ' ' + Date.now(),
        //   imageName: req.file.originalname,
        //   quality: 80
        // }).catch(err => console.log(err));
      } catch (err) {
        console.log('Error', err);
        next(err);
      }
    },

    /**
     * GET apiv/anuncios/id
     */
    detail: async (req, res, next) => {
      try {
        const anuncio = await Anuncio.findById(req.params.id);
        if (anuncio) {
          res.json({
            success: true,
            result: anuncio,
          });
          return;
        }
        next({ status: 404, error: 'Not Found' });
      } catch (error) {
        next(error);
        return;
      }
    },
    /**
     * PUT /apiv1/anuncios/id
     */
    update: async (req, res, next) => {
      try {
        const { name, price, type, photo, tags, description } = req.body;
        const anuncio = await Anuncio.findById(req.params.id);
        if (anuncio) {
          anuncio.name = name ? name : anuncio.name;
          anuncio.price = price ? price : anuncio.price;
          anuncio.type = type ? type : anuncio.type;
          anuncio.photo = photo ? photo : anuncio.photo;
          anuncio.tags = tags ? tags : anuncio.tags;
          anuncio.description = description ? description : anuncio.description;
          // Guardo anuncio en mongoDB
          const anuncioUpdated = await anuncio.save();
          res.json({ success: true, result: anuncioUpdated });
          return;
        }
        // Si llegamos aquí es que no se ha encontrado un resultado
        const err = new Error('Not Advert found');
        err.status = 404;
        next(err);
      } catch (error) {
        next(error);
        return;
      }
    },
    /**
     * GET /apiv1/anuncios/delete/id
     */
    deleteOne: async (req, res, next) => {
      try {
        const result = await Anuncio.findByIdAndRemove(req.params.id);
        res.json({ sucess: true, result });
      } catch (error) {
        next(error);
        return;
      }

    }
  };
};

module.exports = anunciosApiController;
