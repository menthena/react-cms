'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

let SectionActionCreator = Reflux.createActions([
  'createSection',
  'deleteSection',
  'updateSection',
  'updateSections'
]);

SectionActionCreator.createSection.listen(function(categoryId, name) {
  Api.createSection(categoryId, name);
});

SectionActionCreator.deleteSection.listen(function(categoryId, sectionId) {
  Api.deleteSection(categoryId, sectionId);
});

SectionActionCreator.updateSection.listen(function(categoryId, sectionId, data) {
  Api.updateSection(categoryId, sectionId, data);
});

SectionActionCreator.updateSections.listen(function(categoryId, sections) {
  Api.updateSections(categoryId, sections);
});

export default SectionActionCreator;
