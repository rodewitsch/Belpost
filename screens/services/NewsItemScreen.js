import React from 'react';
import { WebView } from 'react-native-webview';

import { View } from 'react-native';

const INJECTED_JAVASCRIPT = `(function() {
    document.querySelector('.news,.center-header-2').setAttribute('style', 'background-color: white; position: fixed; top: 0; left: 0; z-index: 9999; height: 100%; width: 100%; zoom: 3; overflow: scroll;');
    var images = document.querySelectorAll('#text-content img')
    for(var i = 0; i < images.length; i++){images[i].style.width = images[i].style.height = '100%'}
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
      renderLoading={() => <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}></View>} />;
  }
}

NewsItemScreen.navigationOptions = { title: 'Новости' };