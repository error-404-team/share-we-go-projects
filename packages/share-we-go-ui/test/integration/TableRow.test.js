import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses } from 'share-we-go-ui/test-utils';
import TableFooter from 'share-we-go-ui/TableFooter';
import TableHead from 'share-we-go-ui/TableHead';
import TableRow from 'share-we-go-ui/TableRow';

describe('<TableRow> integration', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<TableRow />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the head class when in the context of a table head', () => {
    const wrapper = mount(
      <table>
        <TableHead>
          <TableRow />
        </TableHead>
      </table>,
    );
    assert.strictEqual(wrapper.find('tr').hasClass(classes.root), true);
    assert.strictEqual(wrapper.find('tr').hasClass(classes.head), true);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = mount(
      <table>
        <TableFooter>
          <TableRow />
        </TableFooter>
      </table>,
    );
    assert.strictEqual(wrapper.find('tr').hasClass(classes.root), true);
    assert.strictEqual(wrapper.find('tr').hasClass(classes.footer), true);
  });
});
