const React = novi.react.React;
import Trigger from "./editor/Trigger";
import Header from "./editor/Header";
const messages = novi.language.getDataByKey("novi-plugin-link");
const EditorItem = {
    trigger: <Trigger/>,
    tooltip: messages.editor.tooltip,
    header: [<Header/>],
    closeIcon: "submit",
    width: 290,
    height:350,
    title: messages.editor.title,
    onSubmit: changeLink
};

export default EditorItem;

function changeLink(headerStates, bodyStates) {
    let state = headerStates[0];
    novi.element.setAttribute(state.element, "href", state.href);
}