a11y.css
==============

L’objectif de fichier CSS est d’alerter l’intégrateur sur les erreurs et risques potentiels dans le code - mais il peut également servir à auditer rapidement un site existant afin d’évaluer l’ampleur des dégâts.

De nombreuses références m’ont inspiré et aidé pour élaborer cette feuille de style :
* @see https://github.com/redroot/holmes/blob/master/holmes.css
* @see : http://www.w3.org/TR/html5/obsolete.html#obsolete
* @see : https://github.com/nternetinspired/debug-css
* @see : Mémento "Sites web - Les bonnes pratiques" aux éditions Eyrolles
* @see "Intégration Web, les bonnes pratiques", pages 335/336

Concrètement, les éléments en erreur, en alerte ou obsolète seront cernés d’une bordure externe de 4px colorés :
* en rouge pour les erreurs,
* en jaune pour les alertes,
* en gris pour les élements & attributs obsolètes.

Ces couleurs sont bien évidemment personnalisables. Au survol des éléments ainsi marqués, un bandeau apparaitra en haut de votre navigateur avec une petite formule vous précisant le problème, et un indice sous forme de boutade (tentative plus ou moins réussie de faire un peu de pédagogie en passant).

*Attention :*
Les balises «auto-fermantes» n’autorisent pas la génération de contenu. Ainsi les erreurs ou alertes seront marquées, mais aucun message n’apparaitra au survol. Voici la liste exhaustive des balises HTML5 auto-fermantes :
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

PS: Non, les bonnes pratiques CSS n’ont pas cours dans ce fichier puisque certains sélecteurs sont tout simplement immondes. Mais ce fichier n’est pas voué à être chargé sur d’autres machines que celles des intégrateurs en quête de qualité, comme moi :D.

Ce projet est sous licence [MIT](http://opensource.org/licenses/MIT "The MIT licence") et [CC BY 3.0 FR] (http://creativecommons.org/licenses/by/3.0/fr/ "Explications de la licence").
*Copyright (c) 2013 Gaël Poupard*
