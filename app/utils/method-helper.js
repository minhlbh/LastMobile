import { NavigationActions } from 'react-navigation';

export const resetNavigationTo = (routeName, navigation) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName })],
    });
  
    navigation.dispatch(resetAction);
  };

//format tien
export  var formatterCurrency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  });