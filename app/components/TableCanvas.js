import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Button,
  Table,
  Label,
  Form,
  Icon,
  Segment,
  Checkbox,
  Input,
  Modal,
  Header
} from 'semantic-ui-react';
import { t } from 'testcafe';
import ColumnOptionsModal from './ColumnOptionsModal';
import Footer from './Footer';

const colDataTypes = [
  { key: 'string', text: 'String', value: 'Sequelize.STRING' },
  { key: 'text', text: 'Text', value: 'Sequelize.TEXT' },
  { key: 'integer', text: 'Integer', value: 'Sequelize.INTEGER' },
  { key: 'float', text: 'Float', value: 'Sequelize.FLOAT' },
  { key: 'boolean', text: 'Boolean', value: 'Sequelize.BOOLEAN' }
];

class TableCanvas extends Component {
  state = { tables: [], modalOpen: false };

  componentDidUpdate = () => {
    // console.log('New state');
    // console.log(this.state);
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  addTable = () => {
    this.setState(prevState => ({
      tables: prevState.tables.concat([
        {
          tableName: '',
          columns: [
            {
              columnName: 'id',
              columnType: 'primary key',
              options: undefined
            }
          ]
        }
      ])
    }));
  };

  addColumn = (event, tableIndex) => {
    event.preventDefault();
    const { target } = event;
    const { tables } = this.state;
    // console.log(tables[tableIndex].columns);

    tables[tableIndex].columns.push({
      columnName: '',
      columnType: '',
      options: { allowNull: true, unique: false, defaultValue: '' }
    });
    // console.log(tables[tableIndex].columns);
    this.setState({ tables });

    // this.setState(prevState => {
    //   const newTables = prevState.tables.slice();

    //   newTables[tableIndex].columns = [
    //     ...newTables[tableIndex].columns,
    //     {
    //       columnName: '',
    //       columnType: '',
    //       options: { allowNull: true, unique: false, defaultValue: '' }
    //     }
    //   ];
    //   return { tables: newTables };
    // });
    // console.log(this.state);
  };

  setTableName = (event, tableIndex) => {
    const { tables } = this.state;
    tables[tableIndex].tableName = event.target.value;
    this.setState({
      tables
    });
    // console.log(tables[tableIndex]);
  };

  setColumnName = (event, tableIndex, columnIndex) => {
    const { tables } = this.state;
    tables[tableIndex].columns[columnIndex].columnName = event.target.value;
    this.setState({ tables });
    // console.log(tables);
    // console.log(tables[tableIndex].columns[columnIndex]);
  };

  setDataType = (event, target, tableIndex, columnIndex) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.name, event.target.value);
    // console.log(tableIndex);
    // console.log(columnIndex);
    const { tables } = this.state;
    // console.log(tableIndex);
    // console.log(tables[tableIndex]);
    tables[tableIndex].columns[columnIndex].columnType = target.value;
    this.setState({ tables });
    // console.log(tables);
    console.log(tables[tableIndex].columns[columnIndex]);
  };

  toggleAllowNull = (e, t, i, j) => {
    // console.log(e);
    // console.log(t);
    // console.log(i);
    // console.log(j);
    const { tables } = this.state;
    tables[i].columns[j].options.allowNull = !tables[i].columns[j].options
      .allowNull;
    this.setState({ tables });
  };

  toggleUnique = (e, t, i, j) => {
    const { tables } = this.state;
    tables[i].columns[j].options.unique = !tables[i].columns[j].options.unique;
    this.setState({ tables });
  };

  setDefaultValue = (e, t, i, j) => {
    // console.log(e);
    // console.log(t);
    console.log(i);
    console.log(j);
    const { tables } = this.state;
    tables[i].columns[j].options.defaultValue = t.value;
    this.setState({ tables });
  };

  render() {
    // console.log('State');
    // console.log(this.state);
    // console.log('Props');
    // console.log(this.props);
    const { tables } = this.state;
    return (
      <Container>
        <Link to="/">
          <span style={{ color: 'Dodgerblue' }}>
            <i className="fa fa-arrow-left fa-3x" /> <br />
          </span>
        </Link>
        <Container>
          <Button
            content="Add Table"
            icon="add square"
            labelPosition="left"
            onClick={this.addTable}
          />
        </Container>
        <Container>
          {tables.map((table, i) => (
            <Table celled key={i}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    {/* <div
                      contentEditable
                      suppressContentEditableWarning
                      onChange={event => this.setTableName(event, i)}
                    >
                      {this.state.tables[i].tableName}
                    </div> */}
                    <Form>
                      <Form.Input
                        type="text"
                        name="tableName"
                        value={this.state.tables[i].tableName}
                        error={this.state.tables[i].tableName === ''}
                        placeholder="Table Name"
                        label="Table Name"
                        labelPosition="right"
                        onChange={event => this.setTableName(event, i)}
                      />
                    </Form>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Column Name</Table.HeaderCell>
                  <Table.HeaderCell>Column Type</Table.HeaderCell>
                  <Table.HeaderCell>Column Option</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {table.columns.map((cols, j) =>
                  j === 0 ? (
                    <Table.Row key={j}>
                      <Table.Cell>
                        <Label ribbon>{cols.columnName}</Label>
                      </Table.Cell>
                      <Table.Cell>
                        {cols.columnType}&nbsp;
                        <span style={{ color: 'Gold' }}>
                          <i className="fas fa-key" />
                        </span>
                      </Table.Cell>
                      <Table.Cell />
                    </Table.Row>
                  ) : (
                    <Table.Row key={j}>
                      <Table.Cell>
                        <Form>
                          <Form.Input
                            type="text"
                            name="columnName"
                            placeholder="Column Name"
                            onChange={event => this.setColumnName(event, i, j)}
                            value={this.state.tables[i].columns[j].columnName}
                            error={
                              this.state.tables[i].columns[j].columnName === ''
                            }
                          />
                        </Form>
                      </Table.Cell>
                      <Table.Cell>
                        <Form>
                          <Form.Select
                            fluid
                            name="columnType"
                            // label="Dialect: "
                            options={colDataTypes}
                            placeholder="Select data type"
                            // onChange={event => this.setDataType(event, i, j)}
                            onChange={(event, target) =>
                              this.setDataType(event, target, i, j)
                            }
                          />
                        </Form>
                      </Table.Cell>
                      <Table.Cell>
                        {/* <ColumnOptionsModal /> */}
                        <form>
                          <Modal
                            trigger={
                              <Button onClick={this.handleOpen}>
                                Column Options
                              </Button>
                            }
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            // basic
                            size="small"
                          >
                            <Header icon="browser" content="Column Options" />
                            <Modal.Content>
                              <Segment compact>
                                <Label>Allow Null:&nbsp;</Label>
                                <Checkbox
                                  toggle
                                  checked={
                                    this.state.tables[i].columns[j].allowNull
                                  }
                                  onChange={(e, t) =>
                                    this.toggleAllowNull(e, t, i, j)
                                  }
                                />
                              </Segment>
                              <Segment compact>
                                <Label>Unique:&nbsp;</Label>
                                <Checkbox
                                  toggle
                                  checked={this.state.unique}
                                  onChange={(e, t) =>
                                    this.toggleUnique(e, t, i, j)
                                  }
                                />
                              </Segment>
                              <Segment compact>
                                <Input
                                  label="Default Value"
                                  value={this.state.defaultValue}
                                  onChange={(e, t) =>
                                    this.setDefaultValue(e, t, i, j)
                                  }
                                />
                              </Segment>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button
                                color="green"
                                onClick={this.handleClose}
                                inverted
                              >
                                <Icon name="checkmark" /> Ok
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </form>
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Form onSubmit={event => this.addColumn(event, i)}>
                      <Form.Button
                        floated="right"
                        content="Add Column"
                        icon="add square"
                        labelPosition="left"
                        type="submit"
                        // onClick={this.addColumn}
                      />
                    </Form>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          ))}
        </Container>
        <Footer />
      </Container>
    );
  }
}

export default TableCanvas;
