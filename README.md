a11y.css
==============

L’objectif de ce fichier CSS est d’alerter l’intégrateur sur les erreurs et risques potentiels dans le code - mais il peut également servir à auditer rapidement un site existant afin d’évaluer l’ampleur des dégâts.

*Il ne peut pas se substituer à un outil complet tel que [OpQuast Reporting](http://reporting.opquast.com/fr/): il doit uniquement servir à obtenir un aperçu des faiblesses d’une page.*

De nombreuses références m’ont inspiré et aidé pour élaborer cette feuille de style:
* @see : https://github.com/redroot/holmes/blob/master/holmes.css
* @see : https://github.com/karlgroves/diagnostic.css
* @see : http://www.w3.org/TR/html5/obsolete.html#obsolete
* @see : https://github.com/nternetinspired/debug-css
* @see : Mémento "Sites web - Les bonnes pratiques" aux éditions Eyrolles
* @see "Intégration Web, les bonnes pratiques", pages 335/336

## Code couleur
Concrètement, les éléments en erreur, en alerte ou obsolète seront cernés d’une bordure externe de 4px colorés:
* en rouge pour les erreurs;
* en jaune pour les alertes;
* en gris pour les élements & attributs obsolètes.

Ces couleurs sont bien évidemment personnalisables. Au survol des éléments ainsi marqués, un bandeau apparaitra en haut de votre navigateur avec une petite formule vous précisant le problème, et un indice sous forme de boutade (tentative plus ou moins réussie de faire un peu de pédagogie en passant).

## Gestion des sélecteurs
Étant donné la longue liste de sélecteurs à tester, je les ai «externalisés» dans des fichiers partiels, qui étendent les placeholders dans le fichier principal.

Ça n’est pas forcément une bonne solution, mais j’ai préféré la facilité de lecture et de maintenance de chaque degré de gravité à l’homogénéité du résultat: ce fichier n’est - encore une fois - destiné qu’aux phases de développement. Ses performances n’ont donc pas d’intérêt, tout comme sa compatibilité navigateur.

## Gestion des messages
Chaque test dispose de son propre message, afin d’informer et guider au maximum l’intégrateur en quête d’amélioration. Ils sont eux aussi dans des fichiers partiels, pour en faciliter la lecture et la rédaction. Une personnalisation sera bien plus simple de cette façon (tout le monde n’aimera mes touches d’humour ;-) ).

*Attention :*
Les balises «auto-fermantes» n’autorisent pas la génération de contenu. Ainsi les erreurs ou alertes seront marquées, mais aucun message n’apparaitra au survol. Il sera en revanche consultable dans la plupart des inspecteurs de DOM : la limite est la création du pseudo-éléments pour l’afichage. Voici la liste exhaustive des balises HTML5 auto-fermantes:
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

## Amélioration(s) à venir
Dans un futur plus ou moins proche, les points suivants seront à améliorer ou à créer :
- [ ] trouver un moyen pour afficher les messages liés aux erreurs sur des balises auto-fermantes et des éléments du `<head>` - du javascript sera peut-être nécessaire;
- [ ] ajouter un quatrième degré : *les recommandations*. Bien que non bloquants, certains points (comme la présence des principaux rôles ARIA) peuvent être testés en CSS : j’aurais bien tort de m’en priver.

*PS*: Non, les bonnes pratiques CSS n’ont pas cours dans ce fichier puisque certains sélecteurs sont tout simplement immondes. Mais ce fichier n’est pas voué à être chargé sur d’autres machines que celles des intégrateurs en quête de qualité, comme moi :D.

Ce projet est sous licence [MIT](http://opensource.org/licenses/MIT "The MIT licence") et [CC BY 3.0 FR] (http://creativecommons.org/licenses/by/3.0/fr/ "Explications de la licence").
*Copyright (c) 2013 Gaël Poupard*
