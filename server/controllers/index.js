import {PageConfig} from '../model/page-config';
import {getPosts, getArticle} from '../services/wordpress';
import {getArtefact} from '../services/artefacts';

export const artefact = async(ctx, next) => {
  const id = ctx.params.id;
  const artefact = await getArtefact(id);

  return artefact ? ctx.render('pages/article', {
    pageConfig: new PageConfig({inSection: 'explore'}),
    article: artefact
  }) : next();
};

export const article = async(ctx, next) => {
    const id = ctx.params.id;
    const article = await getArticle(id);

    return article ? ctx.render('pages/article', {
      pageConfig: new PageConfig({inSection: 'explore'}),
      article: article
    }) : next();
};

export const explore = async(ctx) => {
  const wpPosts = await getPosts();
  return ctx.render('pages/explore', {
    pageConfig: new PageConfig({inSection: 'explore'}),
    wpPosts
  });
};

export const index = (ctx) => ctx.render('pages/index', {
  pageConfig: new PageConfig({inSection: 'index'})
});
export const healthcheck = (ctx) => ctx.body = 'ok';
