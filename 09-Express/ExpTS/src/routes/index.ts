import { Router } from 'express';
import MainController from '../controllers/MainController.js';

// Criação do roteador do Express
const routes = Router();

/**
 * Rota principal "/"
 * Exibe uma mensagem simples em HTML
 */
routes.get('/', MainController.home);

/**
 * Rota dinâmica "/lorem/:qtd"
 * Gera a quantidade de parágrafos de Lorem Ipsum com base no parâmetro
 */
routes.get('/lorem/:qtd', MainController.lorem);

/**
 * Rota "/hb1"
 * Renderiza a view hb1.handlebars
 */
routes.get('/hb1', MainController.hb1);

/**
 * Rota "/hb2"
 * Renderiza a view hb2.handlebars
 */
routes.get('/hb2', MainController.hb2);

/**
 * Rota "/hb3"
 * Renderiza a view hb3.handlebars
 */
routes.get('/hb3', MainController.hb3);

/**
 * Rota "/hb4"
 * Renderiza a view hb4.handlebars com filtro via helper "ifNode"
 */
routes.get('/hb4', MainController.hb4);

// Exporta todas as rotas configuradas
export default routes;
