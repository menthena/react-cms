'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

const CategoryActionCreator = Reflux.createActions([
  'createCategory',
  'deleteCategory',
  'updateCategory',
  'updateCategories'
]);

CategoryActionCreator.createCategory.listen((name) => {
  Api.createCategory(name);
});

CategoryActionCreator.deleteCategory.listen((id) => {
  Api.deleteCategory(id);
});

CategoryActionCreator.updateCategory.listen((id, data) => {
  Api.updateCategory(id, data);
});

CategoryActionCreator.updateCategories.listen((categories) => {
  Api.updateCategories(categories);
});

export default CategoryActionCreator;
