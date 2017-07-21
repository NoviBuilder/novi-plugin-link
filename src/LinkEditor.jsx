const React = novi.react.React;
import Trigger from "./editor/Trigger";
import Header from "./editor/Header";

const EditorItem = {
    trigger: <Trigger/>,
    tooltip: "Change Link",
    header: [<Header/>],
    closeIcon: "submit",
    width: 290,
    height:350,
    title: "Change link", 
    onSubmit: changeLink
};

export default EditorItem;

function changeLink(headerStates, bodyStates) {
    let state = headerStates[0];
    novi.element.setAttribute(state.element, "href", state.href);
}