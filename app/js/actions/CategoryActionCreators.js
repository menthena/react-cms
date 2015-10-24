'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

let CategoryActionCreator = Reflux.createActions([
  'createCategory',
  'deleteCategory',
  'updateCategory',
  'updateCategories'
]);

CategoryActionCreator.createCategory.listen(function(name) {
  Api.createCategory(name);
});

CategoryActionCreator.deleteCategory.listen(function(id) {
  Api.deleteCategory(id);
});

CategoryActionCreator.updateCategory.listen(function(id, data) {
  Api.updateCategory(id, data);
});

CategoryActionCreator.updateCategories.listen(function(categories) {
  Api.updateCategories(categories);
});

export default CategoryActionCreator;
