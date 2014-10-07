a11y.css
========

Prononcez « Alix », c’est rigolo et ça mange pas de pain.

## Nouveautés
Désormais des compteurs `CSS` ont incrémentés par chaque erreur, et les résultats sont affichés dans le `body::after`. C’est donc du faux-contenu, son intérêt est purement visuel afin de simplement indiquer au développeur l’étendue du chantier qui l’attend :) .

*À noter :* ce nouveau compteur permet d’obtenir des indications sur l’éventuelle présence de messages incriminant les balises du `<head>`. Ils n’ont toujours pas d’affichage mais ils sont désormais mentionnés dans ce compteur qu’ils incrémentent bien gentimment.

## Présentation
L’objectif de ce fichier `CSS` est d’alerter l’intégrateur sur les erreurs et risques potentiels dans le code — mais il peut également servir à auditer rapidement un site existant afin d’évaluer l’ampleur des dégâts.

*Il ne peut pas se substituer à un outil complet tel que [OpQuast Reporting](http://reporting.opquast.com/fr/) : il doit uniquement servir à obtenir un aperçu des faiblesses d’une page. Chaque critère technique a un alter-ego pour interroger et vérifier la pertinence de la technique employée et du contenu servi à l’utilisateur : c’est alors à vous de faire ces tests, via un contrôle manuel.*

De nombreuses références m’ont inspiré et aidé pour élaborer cette feuille de styles :
* @see https://github.com/redroot/holmes/blob/master/holmes.css
* @see https://github.com/karlgroves/diagnostic.css
* @see http://www.w3.org/TR/html5/obsolete.html#obsolete
* @see https://github.com/nternetinspired/debug-css
* @see http://meyerweb.com/eric/tools/css/diagnostics/
* @see http://accessites.org/site/2006/07/big-red-angry-text/
* @see https://code.google.com/p/qa-style-sheet/
* @see Mémento «Sites web — Les bonnes pratiques» aux éditions Eyrolles
* @see «Intégration Web, les bonnes pratiques», pages 335/336

Je tiens à signaler que l’idée n’est ni neuve, ni de moi (la proposition d’Eric Meyer date de 2007, et l’article de Marco Battilana de Juillet 2006 !). J’ai simplement pensé qu’il était possible d’aller beaucoup plus loin, alors je l’ai fait. Je vous invite à lire [mon article](http://www.ffoodd.fr/a11y-cssun-credo/) pour en apprendre plus sur la genèse de ce projet.

## Code couleur
Concrètement, les éléments en erreur, en alerte, obsolètes ou pouvant être améliorés seront cernés d’un contour de quatre pixels colorés:
* en rouge pour les erreurs;
* en jaune pour les alertes;
* en gris pour les élements & attributs obsolètes;
* en vert les suggestions d’améliorations.

Ces couleurs sont bien évidemment personnalisables. Au survol des éléments ainsi marqués, un bandeau apparaitra en haut de votre navigateur avec une petite formule vous précisant le problème, et un indice sous forme de boutade (tentative plus ou moins réussie de faire un peu de pédagogie en passant).

## Gestion des sélecteurs
Étant donné la longue liste de sélecteurs à tester, je les ai «externalisés» dans des fichiers partiels, qui étendent les placeholders dans le fichier principal.

Ça n’est pas forcément une bonne solution, mais j’ai préféré la facilité de lecture et de maintenance de chaque degré de gravité à l’homogénéité du résultat: ce fichier n’est — encore une fois — destiné qu’aux phases de développement. Ses performances n’ont donc pas d’intérêt, tout comme sa compatibilité navigateur.

## Gestion des messages
Chaque test dispose de son propre message, afin d’informer et guider au maximum l’intégrateur en quête d’amélioration. Ils sont eux aussi dans des fichiers partiels, pour en faciliter la lecture et la rédaction. Une personnalisation sera bien plus simple de cette façon (tout le monde n’aimera mes touches d’humour ;-) ).

## Cas particuliers et problèmes connus
1. Les balises « auto-fermantes » n’autorisent pas la génération de contenu. Ainsi les erreurs ou alertes seront marquées, mais aucun message n’apparaitra au survol. Il sera en revanche consultable dans la plupart des inspecteurs de `DOM` : la limite est la création du pseudo-élément pour l’affichage (cf [la spécification](http://www.w3.org/TR/CSS2/generate.html#before-after-content). Voici la liste exhaustive des balises `HTML5` auto-fermantes:
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

*L’issue #7 ouverte par @7studio a permis d’ajouter une astuce qui permettra d’afficher ces messages, à condition que la balise auto-fermante signalée dispose d’un élément adjacent qui ne soit pas auto-fermant.*

2. Les messages sont générés via un pseudo-élément en position fixe. Il faut cependant souligner un problème de *containing block* causé par un élément parent, si ce dernier se voit appliqué `transform`:
  * @see [La spéc W3C](http://www.w3.org/TR/css3-transforms/#transform-property)
  * @see [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) [traduit en Français par @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement).

3. De même, les tests sur les éléments contenus dans le `<head>` posent un souci pour l’affichage du message : je vais devoir trouver une autre méthode pour afficher ces messages.

4. Pour éviter les cas dans lesquels le contour pourrait être masqué, la propriété [outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset "Définition sur le MDN") est utilisée afin d’afficher le contour à l’intérieur de l’élément marqué. Amélioration suggérée par @7studio dans l’issue #4.

## Amélioration(s) à venir
Dans un futur plus ou moins proche, les points suivants seront à améliorer ou à créer :
- [ ] Trouver un moyen pour afficher les messages liés aux erreurs sur des balises auto-fermantes et des éléments du `<head>` — du javascript sera peut-être nécessaire;
- [x] Ajouter un quatrième degré : *les recommandations*. Bien que non bloquants, certains points (comme la présence des principaux rôles ARIA) peuvent être testés en `CSS` : j’aurais bien tort de m’en priver.

*PS*: Non, les bonnes pratiques `CSS` n’ont pas cours dans ce fichier puisque certains sélecteurs sont tout simplement immondes. Mais ce fichier n’est pas voué à être chargé sur d’autres machines que celles des intégrateurs en quête de qualité, comme moi :D.

Ce projet est sous licence [MIT](http://opensource.org/licenses/MIT "The MIT licence") et [CC BY 3.0 FR](http://creativecommons.org/licenses/by/3.0/fr/ "Explications de la licence").
*Copyright (c) 2013 Gaël Poupard*
