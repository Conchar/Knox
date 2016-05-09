import hg from 'mercury';
import hh from 'hyperscript-helpers';

let { div, form, input, button } = hh(hg.h);

let appState = hg.state({
  userName: hg.value('world'),
  channels: {
    setUserName(state, data) {
      state.userName.set(data.userName);
    },
  },
});

window.appState = appState;

function render(appStateObj)
{
  return div('.mui-container-fluid', 
    div('.mui-panel',
      form({ 'ev-event': hg.sendSubmit(appStateObj.channels.setUserName) }, [
        div(`Hello, ${appStateObj.userName}!`),
        input({type: 'text',name: 'userName', value: appStateObj.userName }),
        button('Update'),
  ])))
}

hg.app(document.body, appState, render);