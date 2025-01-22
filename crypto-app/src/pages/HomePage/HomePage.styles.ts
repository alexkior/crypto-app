import { StyleSheet } from 'react-native'

export const useStyles = () => {
  return {
    styles: StyleSheet.create({
      box: {
        flexGrow: 1,
        paddingHorizontal: 16,
        backgroundColor: 'black'
      },
      buttonWrapper: {
        display: 'flex',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2a2929',
        marginVertical: 16,
        borderRadius: 16
      },
      currencyText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'thin',
        marginLeft: 16
      },
      rateText: {
        color: 'white',
        fontSize: 12,
        marginRight: 16
      },
      diffTextPositive: {
        color: '#72EC89',
        fontSize: 18,
        marginRight: 16,
        fontWeight: 'bold'
      },
      diffTextNegative: {
        color: 'red',
        fontSize: 18,
        marginRight: 16,
        fontWeight: 'bold'
      },
      currencyDetailsBox: {
        height: '54%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }
    })
  }
}
