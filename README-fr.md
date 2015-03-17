a11y.css
========

Prononcez « Alix », c’est rigolo et ça mange pas de pain.

## Présentation

L’objectif de ce fichier `CSS` est d’alerter l’intégrateur sur les erreurs et risques potentiels dans le code — mais il peut également servir à auditer rapidement un site existant afin d’évaluer l’ampleur des dégâts.

*Il ne peut pas se substituer à un outil complet tel que [OpQuast Reporting](http://reporting.opquast.com/fr/) : il doit uniquement servir à obtenir un aperçu des faiblesses d’une page. Chaque critère technique a un alter-ego pour interroger et vérifier la pertinence de la technique employée et du contenu servi à l’utilisateur : c’est alors à vous de faire ces tests, via un contrôle manuel.*

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

### Code couleur

Concrètement, les éléments en erreur, en alerte, obsolètes ou pouvant être améliorés seront cernés d’un contour de quatre pixels colorés:
* en rouge pour les erreurs;
* en jaune pour les alertes;
* en bleu pour les élements & attributs obsolètes;
* en vert les suggestions d’améliorations.

Ces couleurs sont bien évidemment personnalisables. Au survol des éléments ainsi marqués, un bandeau apparaitra en haut de votre navigateur avec une petite formule vous précisant le problème, et un indice sous forme de boutade (tentative plus ou moins réussie de faire un peu de pédagogie en passant).

### Gestion des sélecteurs

Étant donné la longue liste de sélecteurs à tester, je les ai «externalisés» dans des fichiers partiels, qui étendent les placeholders dans le fichier principal.

Ça n’est pas forcément une bonne solution, mais j’ai préféré la facilité de lecture et de maintenance de chaque degré de gravité à l’homogénéité du résultat: ce fichier n’est — encore une fois — destiné qu’aux phases de développement. Ses performances n’ont donc pas d’intérêt, tout comme sa compatibilité navigateur.

### Gestion des messages

Chaque test dispose de son propre message, afin d’informer et guider au maximum l’intégrateur en quête d’amélioration. Ils sont eux aussi dans des fichiers partiels, pour en faciliter la lecture et la rédaction. Une personnalisation sera bien plus simple de cette façon (tout le monde n’aimera mes touches d’humour ;-) ).

## Documentation et cas de test

Une documentation complète ainsi que des cas de test sont désormais disponibles [sur le site dédié](http://ffoodd.github.io/a11y.css/). Le tout est généré en utilisant [Hologram](https://github.com/trulia/hologram) et [sseeeedd](https://github.com/ffoodd/sseeeedd).

## Compteurs

Désormais des compteurs `CSS` ont incrémentés par chaque erreur, et les résultats sont affichés dans le `body::after`. C’est donc du faux-contenu, son intérêt est purement visuel afin de simplement indiquer au développeur l’étendue du chantier qui l’attend :) .

*À noter :* ce nouveau compteur permet d’obtenir des indications sur l’éventuelle présence de messages incriminant les balises du `<head>`. Ils n’ont toujours pas d’affichage mais ils sont désormais mentionnés dans ce compteur qu’ils incrémentent bien gentimment.

## Bookmarklet

Vous pouvez utiliser facilement la dernière version à jour en ajoutant ce *bookmarklet* à vos favoris :
```
javascript:(function(){a11ycss=document.createElement('LINK');a11ycss.href='https://rawgit.com/ffoodd/a11y.css/master/a11y.css';a11ycss.rel='stylesheet';a11ycss.media='all';document.body.appendChild(a11ycss);})();
```
Vous pouvez également l’ajouter en allant sur [la page dédiée](http://ffoodd.github.io/a11y.css/) et en glissant le bouton rouge intitulé « a11y.css » vers votre barre de favoris.

Pratique, n’est-ce pas ?

## À propos des langues

a11y.css existe désormais en français et en anglais : vous trouverez tous les fichiers dans le répertoire [css](https://github.com/ffoodd/a11y.css/tree/master/css). ISi vous souhaitez contribuer en ajoutant une nouvelle langue, c’est très simple :

1. Ajoutez le nom de la langue dans [cette liste](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_mixins.scss#L10) ;
2. Copiez [`_a11y-en.scss`](https://github.com/ffoodd/a11y.css/blob/master/sass/a11y-en.scss), rennommez-le en `_a11y-<your-language>.scss` et modifiez la valeur passée au mixin `set-locale` ;
3. Mettez à jour [cette map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L10) avec vos traductions ;
4. Mettez à jour [cette map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L241) pour traduire le nom des thèmes ;
5. Lancez `sass --update sass:css --style=compressed` pour générer les nouveaux fichiers CSS.

Et voilà !

## Cas particuliers et problèmes connus

1. Les balises « auto-fermantes » n’autorisent pas la génération de contenu. Ainsi les erreurs ou alertes seront marquées, mais aucun message n’apparaitra au survol. Il sera en revanche consultable dans la plupart des inspecteurs de `DOM` : la limite est la création du pseudo-élément pour l’affichage (cf [la spécification](http://www.w3.org/TR/CSS2/generate.html#before-after-content). Voici la liste exhaustive des balises `HTML5` auto-fermantes :

 * `<area />`
 * `<base />`
 * `<br />`
 * `<col />`
 * `<command />`
 * `<embed />`
 * `<hr />`
 * `<img />`
 * `<input />`
 * `<keygen />`
 * `<link />`
 * `<meta />`
 * `<param />`
 * `<source />`
 * `<track />`
 * `<wbr />`
 * `<textarea>`, `<select>`, `<svg>`, `<audio>`, `<video>`, `<track>` et `<iframe>` ne sont pas des balises auto-fermantes mais ne peuvent pas contenir de pseudo-éléments non plus, car ce sont des éléments remplacés. Je vous conseille la lecture de [Qu’est-ce qu’un élément remplacé ?](http://la-cascade.ghost.io/quest-ce-quun-element-remplace/), traduction en français sur La Cascade de [What The Heck Is A Replaced Element?](https://demosthenes.info/blog/461/What-The-Heck-Is-A-Replaced-Element#) écrit par @dudleystorey.

*L’issue #7 ouverte par @7studio a permis d’ajouter une astuce qui permettra d’afficher ces messages, à condition que la balise auto-fermante signalée dispose d’un élément adjacent qui ne soit pas auto-fermant.*

2. Les messages sont générés via un pseudo-élément en position fixe. Il faut cependant souligner un problème de *containing block* causé par un élément parent, si ce dernier se voit appliqué `transform`:
  * @see [La spéc W3C](http://www.w3.org/TR/css3-transforms/#transform-property)
  * @see [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) [traduit en Français par @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement).

3. De même, les tests sur les éléments contenus dans le `<head>` posent un souci pour l’affichage du message.

 *Dans l’issue [#66](https://github.com/ffoodd/a11y.css/issues/66) ouverte par [@7studio](https://twitter.com/7studio) (de nouveau), une solution a été aportée grâce à [une idée](https://mathiasbynens.be/notes/css-hidden-elements) de [Mathias Bynens](https://twitter.com/mathias).

4. Pour éviter les cas dans lesquels le contour pourrait être masqué, la propriété [outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset "Définition sur le MDN") est utilisée afin d’afficher le contour à l’intérieur de l’élément marqué. Amélioration suggérée par @7studio dans l’issue #4.

## Compiler une version nivelée

Vous pouvez désormais adapter le fichier de sortie au niveau d’erreur que vous souhaitez. Vous n’avez qu’à modifier le seul paramètre du mixin `set-minimum-level`. Les niveaux sont cumulatifs, et sont fidèles au nomage des thèmes :
* `error`: seulement les erreurs;
* `warning`: les alertes et erreurs ;
* `obsolete`: les trucs obsolètes, les alertes et les erreurs ;
* `advice`: la totale.

Nous partons du principe que si vous êtes intéressés par les conseils, vous le serez aussi par les alertes et les erreurs.

Merci à [@HugoGiraudel](https://twitter.com/HugoGiraudel) dans l’issue [#69](https://github.com/ffoodd/a11y.css/issues/69).

## Désactiver des tests

Il est possible de désactiver des tests au cas par cas si vous compilez votre propre version de `a11y.css`. Utilisez les mixins suivants :

* `disable-errors($keys...)`
* `disable-advices($keys...)`
* `disable-warnings($keys...)`
* `disable-obsoletes($keys...)`

Par exemple, si vous voulez désactiver les erreurs à propos des mauvais `tabindex` et du `href` manquant, voici comment faire :

```scss
@include disable-errors("tab-order, no-href");
```

Merci à [@HugoGiraudel](https://twitter.com/HugoGiraudel) dans l’issue [#69](https://github.com/ffoodd/a11y.css/issues/113).

## Construire la SassDoc

Avec une installation globale SassDoc :

```sh
$ npm install sassdoc -g
$ sassdoc sass/ docs/ --verbose --config .sassdocrc
```

Avec une installation locale SassDoc :

```sh
$ npm install
$ node_modules/sassdoc/bin/sassdoc sass/ docs/ --verbose --config .sassdocrc
```

## Crédits et remerciements

### Contributeurs

Ils ont beaucoup aidé :
* [@HugoGiraudel](https://twitter.com/HugoGiraudel)
* [@7studio](https://twitter.com/7studio)
* [@Heydon](https://twitter.com/heydonworks)
* [@kloh-fr](https://twitter.com/klohFR)
* [@GaetanBt](https://twitter.com/GaetanBt)
* [@a5e](https://github.com/a5e)

Et ils ont pris le temps d’ouvrir des issues :
* [@goetsu](https://twitter.com/goetsu)
* [@olamedia](https://github.com/olamedia)
* [@bartveneman](http://bveneman.nl/)

Merci à tous !

*PS*: Non, les bonnes pratiques `CSS` n’ont pas cours dans ce fichier puisque certains sélecteurs sont tout simplement immondes. Mais ce fichier n’est pas voué à être chargé sur d’autres machines que celles des intégrateurs en quête de qualité, comme moi :D.

Ce projet est sous licence [MIT](http://opensource.org/licenses/MIT "The MIT licence") et [CC BY 3.0 FR](http://creativecommons.org/licenses/by/3.0/fr/ "Explications de la licence").
*Copyright (c) 2013 Gaël Poupard*

