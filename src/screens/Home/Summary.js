import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';

const SummaryCard = function({ user }) {
  return (
    <Card>
      <Card.Title>Summary</Card.Title>
      <Divider />
      <CustomAmountItem text={"Net Worth"} value={user.balances.total} />
      <Divider />
      <CustomAmountItem text={"Fintoc"} value={user.balances.fintoc} />
      <Divider />
      <CustomAmountItem text={"Buda"} value={user.balances.buda} />
      <Divider />
      <CustomAmountItem text={"Fintual"} value={user.balances.fintual} />
      <Divider />
      <CustomAmountItem text={"Income"} value={user.income} />
      <Divider />
      <CustomAmountItem text={"Expense"} value={user.expense} />
      <Divider />
      <CustomAmountItem text={"Investments"} value={user.investments_return} />
      <Divider />
      <CustomAmountItem text={"Quota"} value={user.quota} />
      <Divider />
      <CustomAmountItem text={"Quota remaining"} value={user.remaining} />
    </Card>
  );
}

export default function Summary({ user }) {
  return (
    <View>
      <Text style={styles.title} text={user.name}/>
      <Text style={{ textAlign: 'center' }} text={user.email}/>
      {user !== null && <SummaryCard user={user} /> }
    </View>
  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
});
