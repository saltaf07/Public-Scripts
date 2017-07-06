import Router from 'koa-router';
import {healthcheck, featureFlags} from '../controllers/utils';
import {seriesNav, seriesTransporter, latestInstagramPosts, seriesContainerPromoList} from '../controllers/async-controllers';
import {renderEditorial, renderEditorialPreview, setPreviewSession} from '../controllers/content';
import {explore} from '../controllers/lists';
import {work, search} from '../controllers/work';
import {index, article, articles, preview, series} from '../controllers'; // Deprecated

const r = new Router({
  sensitive: true
});

// Util / function
r.get('/', index);
r.get('/healthcheck', healthcheck);
r.get('/flags', featureFlags);

// Content
r.get('/editorial/(W):id', renderEditorial);
r.get('/preview/:id', renderEditorialPreview);
r.get('/explore', explore);
r.get('/preview', setPreviewSession);

// API
r.get('/search', search);
r.get('/works/:id', work);

// Deprecated: Wordpress content
r.get('/articles/:slug', article);
r.get('/articles/preview/:id', preview);
r.get('/series/:id', series);
r.get('/articles', articles);

// Async
r.get('/series-nav/:id', seriesNav);
r.get('/series-transporter/:id', seriesTransporter);
r.get('/latest-instagram-posts', latestInstagramPosts);
r.get('/series-container-promos-list/:id', seriesContainerPromoList);

export const router = r.middleware();
