export const cardColor = (status) => {
    let cardColor
    switch (status) {
      case 'atCafe':
        cardColor = 'yellow'
        break
      case 'adopted':
        cardColor = 'red'
        break
      case 'foster':
        cardColor = 'olive'
        break
      case 'angel':
        cardColor = 'brown'
        break
      default:
        cardColor = 'grey'
    }
    return cardColor
  }
