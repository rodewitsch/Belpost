import React from 'react';
import { WebView } from 'react-native-webview';

import { View } from 'react-native';

const INJECTED_JAVASCRIPT = `(function() {
  document.querySelector('.news,.center-header-2').setAttribute('style', 'background-color: white; position: fixed; top: 0; left: 0; z-index: 9999; height: 100%; width: 100%; zoom: 2; overflow: scroll;');
  document.querySelectorAll('.news,.center-header-2 img').forEach(img => img.style.width = img.style.height = '100%')
})();`;

export class NewsItemScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <WebView
      source={{ uri: this.props.navigation.state.params }}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      style={{ margin: 20 }}
      startInLoadingState={true}
      renderLoading={() => <View style={{ backgroundColor: 'blue', height: '100%', width: '100%' }}></View>} />;
  }
}

NewsItemScreen.navigationOptions = { title: 'Новости' };