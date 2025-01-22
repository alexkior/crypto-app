import { StyleSheet } from 'react-native'

export const useStyles = () => {
  return {
    styles: StyleSheet.create({
      box: {
        flexGrow: 1,
        paddingHorizontal: 16,
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      },
      headerWrapper: {
        display: 'flex',
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2a2929',
        marginVertical: 16,
        borderRadius: 16
      },
      detailsWrapper: {
        paddingVertical: '5%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#2a2929',
        marginVertical: 16,
        borderRadius: 16
      },
      rateText: {
        color: 'white',
        fontSize: 12,
        marginRight: 16
      },
      currencyText: {
        color: 'white',
        fontSize: 40,
        // fontWeight: 'bold',
        marginLeft: 16
      },
      detailsRow: {
        paddingVertical: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%'
      },
      titleText: {
        color: '#828282',
        fontSize: 16,
        marginLeft: 16
      },
      descriptionText: {
        color: 'white',
        fontSize: 16,
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
      },
      buttonWrapper: {
        display: 'flex',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#72EC89',
        marginVertical: 16,
        borderRadius: 16
      },
      buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
      }
    })
  }
}
