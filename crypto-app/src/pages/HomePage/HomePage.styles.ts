import { StyleSheet } from 'react-native'

export const useStyles = () => {
  return {
    styles: StyleSheet.create({
      box: {
        flex: 1,
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
      },
      searchBar: {
        backgroundColor: 'black',
        color: 'white',
        borderBottomColor: 'black',
        borderTopColor: 'black'
      },
      searchBarInputContainerStyle: {
        backgroundColor: 'black',
        borderBottomColor: 'black',
        borderTopColor: 'black'
      },
      searchBarContainerStyle: {
        width: '80%',
        height: 72,
        backgroundColor: 'black',
        borderBottomColor: 'black',
        borderTopColor: 'black',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      sortWrapper: {
        width: '20%',
        height: 72,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      loaderBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      },
      errorText: {
        paddingTop: 16,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
      }
    })
  }
}
