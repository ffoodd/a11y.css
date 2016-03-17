a11y.css
========

Prononcez « Alix », c’est rigolo et ça mange pas de pain.

[![GitHub version](https://badge.fury.io/gh/ffoodd%2Fa11y.css.svg)](https://badge.fury.io/gh/ffoodd%2Fa11y.css) [![npm version](https://badge.fury.io/js/a11y.css.svg)](https://badge.fury.io/js/a11y.css) [![Bower version](https://badge.fury.io/bo/a11y.css.svg)](https://badge.fury.io/bo/a11y.css) [![devDependency Status](https://david-dm.org/ffoodd/a11y.css/dev-status.svg)](https://david-dm.org/ffoodd/a11y.css#info=devDependencies) [![Build Status](https://travis-ci.org/ffoodd/a11y.css.svg?branch=master)](https://travis-ci.org/ffoodd/a11y.css) [![Code Climate](https://codeclimate.com/github/ffoodd/a11y.css/badges/gpa.svg)](https://codeclimate.com/github/ffoodd/a11y.css)

## Présentation

L’objectif de ce fichier `CSS` est d’alerter l’intégrateur sur les erreurs et risques potentiels dans le code — mais il peut également servir à auditer rapidement un site existant afin d’évaluer l’ampleur des dégâts.

Au survol des éléments signalés, un bandeau apparaitra en haut de votre navigateur avec une petite formule vous précisant le problème, et un indice sous forme de boutade (tentative plus ou moins réussie de faire un peu de pédagogie en passant).

*Il ne peut pas se substituer à un outil complet tel que [OpQuast Reporting](http://reporting.opquast.com/fr/), [Tanaguru](http://www.tanaguru.com/fr/) ou [Tenon](http://tenon.io/) : il doit uniquement servir à obtenir un aperçu des faiblesses d’une page. Chaque critère technique a un alter-ego pour interroger et vérifier la pertinence de la technique employée et du contenu servi à l’utilisateur : c’est alors à vous de faire ces tests, via un contrôle manuel.*

### Compteurs

Des compteurs `CSS` sont incrémentés par chaque erreur, et les résultats sont affichés dans le `html::after`. C’est donc du faux-contenu, son intérêt est purement visuel afin de simplement indiquer au développeur l’étendue du chantier qui l’attend. Vous le verrez directement en bas à gauche de votre page :).


# Utilisation

Il est possible de se servir dʼ`a11y.css` de diverses manières.

## _Bookmarklet_

Vous pouvez utiliser facilement la dernière version à jour en ajoutant ce *bookmarklet* à vos favoris :
```
javascript:(function(){a11ycss=document.createElement('LINK');a11ycss.href='https://rawgit.com/ffoodd/a11y.css/master/a11y.css';a11ycss.rel='stylesheet';a11ycss.media='all';document.body.appendChild(a11ycss);})();
```
Vous pouvez également l’ajouter en allant sur [la page dédiée](http://ffoodd.github.io/a11y.css/) et en glissant le bouton rouge intitulé « a11y.css » vers votre barre de favoris.

Pratique, n’est-ce pas ?

### Le cas des CSP

Les [CSP](https://www.w3.org/TR/CSP/) sont super chouettes, mais peuvent poser des problèmes si vous souhaitez utiliser
le _bookmarklet_. Soyons honnêtes, en théorie *vous ne devriez pas modifier vos CSP pour que le bookmarklet fonctionne*.

Il existe cependant quelques _bugs_ — sur divers navigateurs — qui nous en empêchent.
Voici donc les directives à ajouter, en attendant que les navigateurs traitent leurs _bugs_ respectifs :

* `script-src 'unsafe-inline'`
* `style-src https://rawgit.com/`

Et ça devrait aller ! Si vous souhaitez en apprendre plus sur les divers _bugs_ mentionnés
(et découvrir de super ressources pour implémenter vos CSP) je vous conseille la lecture de
l’issue [#201](https://github.com/ffoodd/a11y.css/issues/201) ouverte et documentée par l’inénarrable [Nicolas Hoffmann](https://twitter.com/Nico3333fr).

## Fichier CSS

Vous trouverez les fichiers `CSS` statiques dans le dossier `/CSS`.
Ces fichiers sont disponibles en Français et en Anglais, en version complète ou nivelée.
Vous pouvez simplement les récupérer et les ajouter à vos outils de développements statiques,
comme n’importe quel fichier `CSS`.

## Fichiers Sass

Vous avez accès aux sources, alors profitez-en !
À partir de ces fichiers, vous pouvez [construire votre propre version d’`a11y.css`](https://github.com/ffoodd/a11y.css/blob/master/CUSTOMIZE-fr.md).
Vous verrez, c’est facile !

## Projet Gulp

Pour les plus braves d’entre vous, la configuration Gulp permet de travailler la totalité du projet :
* la compilation `Sass` ;
* l’optimisation des fichiers `CSS` ;
* la génération des documentations Hologram et SassDoc ;
* le *linting* des fichiers `scss` et `CSS`.

Si vous en arrivez là, je suppose que vous vous repèrerez aisément dans la configuration. Dans le cas contraire, posez une question ;)
*Attention* : vous aurez besoin de [quelques `gem` Ruby](https://github.com/ffoodd/a11y.css/blob/master/Gemfile), je vous recommande d’installer Bundler et de faire un `bundle install`.


## *Via* `npm` ou `Bower`

Vous pouvez récupérer le projet grâce aux commandes respectives `npm install a11y.css` et `bower install a11y.css`.

## Crédits et remerciements

### Références et inspirations

De nombreuses références m’ont inspiré et aidé pour élaborer cette feuille de styles :

* [https://github.com/redroot/holmes/blob/master/holmes.css](https://github.com/redroot/holmes/blob/master/holmes.css)
* [https://github.com/karlgroves/diagnostic.css](https://github.com/karlgroves/diagnostic.css)
* [http://www.w3.org/TR/html5/obsolete.html#obsolete](http://www.w3.org/TR/html5/obsolete.html#obsolete)
* [https://github.com/nternetinspired/debug-css](https://github.com/nternetinspired/debug-css)
* [https://yahoo.github.io/debugCSS/](https://yahoo.github.io/debugCSS/)
* [http://meyerweb.com/eric/tools/css/diagnostics/](http://meyerweb.com/eric/tools/css/diagnostics/)
* [http://accessites.org/site/2006/07/big-red-angry-text/](http://accessites.org/site/2006/07/big-red-angry-text/)
* [http://www.accessiweb.org/index.php/accessiweb-html5aria-liste-deployee.html](http://www.accessiweb.org/index.php/accessiweb-html5aria-liste-deployee.html)
* [https://github.com/Heydon/REVENGE.CSS](https://github.com/Heydon/REVENGE.CSS)
* [https://code.google.com/p/qa-style-sheet/](https://code.google.com/p/qa-style-sheet/)
* Mémento « Sites web — Les bonnes pratiques »
* « Intégration Web, les bonnes pratiques », pages 335/336

Je tiens à signaler que l’idée n’est ni neuve, ni de moi (la proposition d’Eric Meyer date de 2007, et l’article de Marco Battilana de Juillet 2006 !). J’ai simplement pensé qu’il était possible d’aller beaucoup plus loin, alors je l’ai fait. Je vous invite à lire [mon article](http://www.ffoodd.fr/a11y-cssun-credo/) pour en apprendre plus sur la genèse de ce projet.

### Contributeurs

Ils ont beaucoup aidé :
* [@HugoGiraudel](https://twitter.com/HugoGiraudel)
* [@7studio](https://twitter.com/7studio)
* [@Heydon](https://twitter.com/heydonworks)
* [@nico3333fr](https://twitter.com/Nico3333fr)
* [@kloh-fr](https://twitter.com/klohFR)
* [@GaetanBt](https://twitter.com/GaetanBt)
* [@a5e](https://github.com/a5e)

Et ils ont pris le temps d’ouvrir des issues :
* [@goetsu](https://twitter.com/goetsu)
* [@Twikito](https://twitter.com/twikito)
* [@olamedia](https://github.com/olamedia)
* [@bartveneman](http://bveneman.nl/)
* [@olivares](https://twitter.com/olivares)
* [@vibby](https://twitter.com/vibby0)
* [@accesbilis](https://twitter.com/accesbilis)

Merci à tous !

Ce projet est sous licence [MIT](http://opensource.org/licenses/MIT "The MIT licence") et [CC BY 3.0 FR](http://creativecommons.org/licenses/by/3.0/fr/ "Explications de la licence").
*Copyright (c) 2013 Gaël Poupard*
