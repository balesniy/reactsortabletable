import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './react-bootstrap-table-all.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }
  // форматируем вывод даты в ячейках теблицы из строки JSON
  dateFormatter(dateString) {
    return new Date(Date.parse(dateString)).toLocaleString('ru', {
      year:  'numeric',
      month: '2-digit',
      day:   '2-digit',
    });
  }
  //
  mappedData(data) {
    //считаем количество полных дней от даты заданной строкой до текущей даты
    const getDaysFromNow = (dateString) => Math.floor((Date.now() - Date.parse(dateString)) / (1000 * 3600 * 24));

    //дополняем данные вычисляемыми полями
    return data.map(i => ({
      ...i,
      daysOfprsr:          i.overdue_debt_date ? getDaysFromNow(i.overdue_debt_date) : 0,
      applied_bp_joined:   i.applied_bp.join(' '),
      status_types_joined: i.status_types.join(' '),
    }))
  }

  componentWillMount() {
    const { data } = this.props;
    this.setState({ data: this.mappedData(data) })
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ data: this.mappedData(data) })
  }

  render() {
    return <BootstrapTable data={this.state.data} striped hover>
      <TableHeaderColumn dataSort={ true } dataField='filial_name'>Филиал</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } isKey dataField='business_n'>№ кредитного дела</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='fio'>ФИО</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='business_n_monetary_oblig'>№ договора</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='date_issue_agreement' dataFormat={ this.dateFormatter }>Дата
        выдачи
        кредита/займа</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='credit_amount'>Сумма кредита в валюте кредита</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='srochssudzd'>Срочная ссудная задолженность</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='overdue_debt_date' dataFormat={ this.dateFormatter }>Дата выхода
        на
        просрочку</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='prsrssudzd'>Просроченная задолженность</TableHeaderColumn>
      <TableHeaderColumn dataSort={ true } dataField='daysOfprsr'>Дней просрочки</TableHeaderColumn>
      <TableHeaderColumn dataField='applied_bp_joined'>Бизнес-процессы</TableHeaderColumn>
      <TableHeaderColumn dataField='status_types_joined'>Статусы</TableHeaderColumn>
    </BootstrapTable>
  }
}

export default App;
