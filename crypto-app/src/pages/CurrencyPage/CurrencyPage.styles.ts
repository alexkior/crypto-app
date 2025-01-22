import { StyleSheet } from 'react-native'

export const useStyles = () => {
  return {
    styles: StyleSheet.create({
      box: {
        flexGrow: 1,
        paddingHorizontal: 16,
        backgroundColor: 'black'
      },
      detailsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#2a2929',
        marginVertical: 16,
        borderRadius: 16
      },
      currencyText: {
        color: 'white',
        fontSize: 40,
        // fontWeight: 'bold',
        marginLeft: 16
      },
      rateText: {
        color: 'white',
        fontSize: 12,
        marginRight: 16
      },
      diffTextPositive: {
        color: 'green',
        fontSize: 16,
        marginRight: 16,
        fontWeight: 'bold'
      },
      diffTextNegative: {
        color: 'red',
        fontSize: 16,
        marginRight: 16,
        fontWeight: 'bold'
      },
      currencyDetailsBox: {
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }
    })
  }
}
