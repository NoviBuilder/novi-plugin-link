const React = novi.react.React;
const Component = novi.react.Component;
const Input = novi.ui.input;
const Icons = novi.ui.icons;
const Checkbox = novi.ui.checkbox;
const Button = novi.ui.button;
const Language = novi.language;
export default class LinkSettings extends Component {
    constructor(props) {
        super();
        this.counterId = 0;
        this.state = {
            querySelector: props.settings.querySelector,
            favoriteLinks: this._getFavoriteLinks(props.settings.favoriteLinks),
            applyToProjectElements: props.settings.applyToProjectElements
        };

        this._saveSettings = this._saveSettings.bind(this);
        this._onChange = this._onChange.bind(this);
        this._renderFavoriteLinks = this._renderFavoriteLinks.bind(this);
        this._onAdd = this._onAdd.bind(this);
        this._onCheckboxChange = this._onCheckboxChange.bind(this);
        this.messages = Language.getDataByKey("novi-plugin-link");

        this.style = `
                .novi-link-plugin-settings-wrap{
                    display: flex;
                    justify-content: flex-start;
                }       
                .novi-link-plugin-settings-left-part{
                    position: fixed;
                    max-width: 355px;
                }
                .novi-link-plugin-settings-right-part{
                    margin-left: 400px;
                    min-width: 373px;
                }
                .novi-link-plugin-settings-right-part-header{
                    position:relative
                }
                .novi-link-plugin-settings-input-label{
                    font-size: 13px;
                    color: #6E778A;
                    margin-top: 10px;
                    display: block;
                    padding-bottom: 10px;
                    line-height: 22px;
                }
                .novi-link-plugin-settings-input-label span{
                    float: right;
                }
                
                .novi-link-plugin-settings-apply-type-description{
                    font-size: 13px;
                    color: #6E778A; 
                    margin-top: 10px;
                    display: block;
                    line-height: 22px;
                }
                .novi-link-plugin-settings-apply-type{
                    margin-top: 15px;
                }
                .novi-link-plugin-settings-apply-type .checkbox .checkbox-text{
                    font-size: 13px;
                }
                .novi-link-plugin-settings-title{
                    font-size: 13px;
                    line-height: 16px;
                    color: #fff;
                    letter-spacing: 0.0462em;
                }
                .novi-link-plugin-settings-group{
                    display: flex;
                    align-items: flex-end;
                }
                .novi-link-plugin-settings-group-number{
                    font-size: 15px;
                    display: block;
                    color: #6E778A;
                    padding-bottom: 7px;
                    padding-right: 10px;
                    font-weight: 300;
                }
                .novi-link-plugin-duplicated-icon{
                    position: absolute;
                    right: 5px;
                    bottom: 6px;
                    width: 20px;
                    height: 20px;
                }
                .novi-link-plugin-duplicated-icon svg{
                    fill: rgba(255, 220, 131, 0.6);
                }
                .novi-link-plugin-settings-group-item{ 
                    position: relative
                }
                .novi-link-plugin-settings-group-item .novi-input{
                    width: 200px;
                }
               
                .novi-link-plugin-settings-group-item .novi-link-plugin-settings-input.duplicated{
                    border-color: rgba(255, 220, 131, 0.6);
                    padding-right: 33px;
                }
                .novi-link-plugin-settings-group-item + .novi-link-plugin-settings-group-item{
                    margin-left: 20px;
                }
                .novi-link-plugin-settings-group-item + .novi-link-plugin-settings-group-item .novi-link-plugin-settings-input-label{
                    margin-top: 10px;
                }
                .novi-link-plugin-settings-group-remove-button{
                    position:relative;
                    width: 30px;
                    height: 30px;
                    margin-left: 5px;
                    cursor: pointer; 
                }
                .novi-link-plugin-settings-group-remove-button svg{
                    width: 10px;
                    height: 10px;
                    fill: rgb(255, 255, 255);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .novi-plugin-link-settings-group-add{
                    width: 12px;
                    height: 12px;
                    position: absolute;
                    cursor: pointer;
                    right: 10px;
                    top: 2px;
                }
               
                .novi-plugin-link-settings-group-add-icon{
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .novi-plugin-link-settings-group-add-icon:before {
                    width: 12px;
                    margin-left: -6px;
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    height: 2px;
                    background: #10B7F7;
                    margin-top: -1px;
                }
                .novi-plugin-link-settings-group-add-icon:after{
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 2px;
                    margin-left: -1px;
                    background: #10B7F7;
                    height: 12px;
                    margin-top: -6px;
                }
                .novi-link-plugin-settings-save-button{
                    margin-top: 30px;
                }
        `;
    }

    render() {
        return (
            <div>
                <div className="novi-link-plugin-settings-wrap">
                    <style>{this.style}</style>
                    <div className="novi-link-plugin-settings-left-part">
                        <span className="novi-link-plugin-settings-title">Link Plugin</span>
                        <div
                            className="novi-link-plugin-settings-input-label">{this.messages.settings.inputPlaceholder}</div>
                        <Input className="novi-link-plugin-settings-input"
                               value={this.state.querySelector}
                               onChange={this._onChange}/>
                        <div className="novi-link-plugin-settings-apply-type">
                            <Checkbox onChange={this._onCheckboxChange}
                                      checked={this.state.applyToProjectElements}>{this.messages.settings.applyToProjectElements}</Checkbox>
                            <div
                                className="novi-link-plugin-settings-apply-type-description">{this.messages.settings.applyToProjectElementsDescription}</div>
                        </div>
                        <div className="novi-link-plugin-settings-save-button">
                            <Button type="primary" disabled={this.state.hasEmptyValues} className="novi-link-plugin-settings-save-button"
                                    messages={{textContent: this.messages.settings.submitButton}}
                                    onClick={this._saveSettings}/>
                        </div>
                    </div>
                    <div className="novi-link-plugin-settings-right-part">
                        <div className="novi-link-plugin-settings-right-part-header">
                            <span
                                className="novi-link-plugin-settings-title">{this.messages.settings.favoriteLinksTitle}</span>
                            <div className="novi-plugin-link-settings-group-add" onClick={this._onAdd}>
                                <div className="novi-plugin-link-settings-group-add-icon">
                                </div>
                            </div>
                        </div>
                        <div className="novi-link-plugin-settings-right-part-body">
                            {this._renderFavoriteLinks()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _renderFavoriteLinks() {
        let counter = 0;
        return this.state.favoriteLinks.map((item, i) => {
            if (item.toDelete) return;
            counter += 1;
            return (
                <div key={item.id} className="novi-link-plugin-settings-group">
                    <div className="novi-link-plugin-settings-group-number">{counter}.</div>
                    <div className="novi-link-plugin-settings-group-item">
                        <span
                            className="novi-link-plugin-settings-input-label">{this.messages.settings.favoriteItemLinkTitle}</span>
                        <Input className="novi-link-plugin-settings-input" type="text" value={item.title}
                               onChange={this._onLinkChange.bind(this, i, "title")}/>
                    </div>
                    <div className="novi-link-plugin-settings-group-item">
                        <span className="novi-link-plugin-settings-input-label">{this.messages.settings.favoriteItemLinkValue} <span style={{float: "right"}}>({this.messages.settings.linksCountLabel} {item.count})</span></span>

                            <Input className={item.duplicated ? "novi-link-plugin-settings-input duplicated": "novi-link-plugin-settings-input"} type="text" value={item.value}
                                   onChange={this._onLinkChange.bind(this, i, "value")}/>
                        {this._renderDuplicatedItemIcon(item)}

                    </div>
                    <div onClick={this._onRemove.bind(this, i)}
                         className="novi-link-plugin-settings-group-remove-button">
                        <svg viewBox="0 0 20 20">
                            <path
                                d="M10.707 10.5l8.646-8.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-8.646 8.646-8.646-8.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l8.646 8.646-8.646 8.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l8.646-8.646 8.646 8.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-8.646-8.646z"/>
                        </svg>
                    </div>
                </div>
            )
        });
    }

    _renderDuplicatedItemIcon(item){
        if (!item.duplicated) return null;
        novi.tooltip.forceUpdate();
        return (
            <div className="novi-link-plugin-duplicated-icon" data-for={item.duplicated ? 'tooltip-global': ""} data-tip={this.messages.settings.duplicateError}>
                {Icons.ICON_WARNING}
            </div>
        )
    }

    _getFavoriteLinks(links) {
        this.counterId = links.length;
        let favoriteLinks = links.map((item, i) => {
            let targetItem = Object.assign({}, item);
            if (targetItem.value) targetItem.initValue = targetItem.value;
            targetItem.id = i;
            return targetItem;
        });

        let counter;

        for (let i in favoriteLinks){
            counter = 0;
            novi.utils.loopElementsBySelector(`a[href="${favoriteLinks[i].value}"]`, () => {counter++}, false);
            favoriteLinks[i].count = counter;
        }
        return this._isItemValueDuplicate(favoriteLinks);
    }

    _onChange(e) {
        this.setState({
            querySelector: e.target.value
        })
    }

    _onCheckboxChange(isActive) {
        this.setState({
            applyToProjectElements: isActive
        })
    }

    _onLinkChange(i, key, e) {
        let hasEmptyValues = false;
        let favoriteLinks = this._immutableCopy(this.state.favoriteLinks);
        favoriteLinks[i][key] = e.target.value;
        if (this._hasEmptyValues(favoriteLinks)) hasEmptyValues = true;
        if (key === "value"){
            let counter = 0;
            novi.utils.loopElementsBySelector(`a[href="${favoriteLinks[i].value}"]`, () => {counter++}, false);
            favoriteLinks[i].count = counter;
        }
        this.setState({
            favoriteLinks: this._isItemValueDuplicate(favoriteLinks),
            hasEmptyValues
        })
    }

    _onRemove(i) {
        let favoriteLinks = this._immutableCopy(this.state.favoriteLinks);
        let hasEmptyValues = false;
        favoriteLinks[i].toDelete = true;
        if (favoriteLinks[i].initValue) favoriteLinks[i].value = "#";

        if(!this._getFavoriteLinksLength(favoriteLinks)) {
            favoriteLinks.unshift({value: "", title: "", id: this.counterId, count: 0});
            this.counterId += 1;
        }

        if (this._hasEmptyValues(favoriteLinks)) hasEmptyValues = true;


        this.setState({
            favoriteLinks: this._isItemValueDuplicate(favoriteLinks),
            hasEmptyValues
        })
    }

    _onAdd() {
        let favoriteLinks = this._immutableCopy(this.state.favoriteLinks);
        favoriteLinks.unshift({value: "", title: "", id: this.counterId, count: 0});
        this.counterId += 1;
        this.setState({
            favoriteLinks: this._isItemValueDuplicate(favoriteLinks),
            hasEmptyValues: true
        })
    }

    _saveSettings() {
        let favoriteLinks = this._immutableCopy(this.state.favoriteLinks);
        this._changeProjectLinks(favoriteLinks);
        favoriteLinks = favoriteLinks.filter((item) => {
            return !item.toDelete
        }).map((item)=>{
            return {
                value: item.value,
                title: item.title,
                id: item.id
            }
        });

        let state = {
            settings: {
                querySelector: this.state.querySelector,
                favoriteLinks,
                applyToProjectElements: this.state.applyToProjectElements
            }
        };

        this.setState(state.settings);

        novi.plugins.settings.update("novi-plugin-link", state.settings);
    }

    _immutableCopy(mass) {
        let links = mass.slice();
        return links.map((item) => {
            return Object.assign({}, item)
        })
    }

    _changeProjectLinks(favoriteLinks) {
        if (!favoriteLinks.length || !this.state.applyToProjectElements) return;
        for (let i = 0; i < favoriteLinks.length; i++) {
            let initValue = favoriteLinks[i].initValue;
            let value = favoriteLinks[i].value;
            if (initValue && initValue !== value && initValue !== "index.html") {
                if (favoriteLinks[i].toDelete && favoriteLinks[i].duplicated) return;
                novi.utils.loopElementsBySelector(`a[href="${initValue}"]`, (element, dynamicElement, onActivePage) => {
                    if (onActivePage) novi.element.setAttribute(dynamicElement, "href", value);
                    else element.setAttribute("href", value)
                });
            }
        }
    }

    _getFavoriteLinksLength(links){
        let count = 0;
        for (let i=0; i<links.length; i++){
            if (!links[i].toDelete) count += 1;
        }
        return count;
    }

    _isItemValueDuplicate(links){
        let duplicated;
        for (let i in links){
            if (links[i].toDelete){
                continue;
            }
            duplicated = false;
            for (let j in links) {
                if (i === j) continue;

                if (links[j].value === links[i].value && !links[j].toDelete){
                    duplicated = true;
                    links[j].duplicated = true;
                }
            }
            links[i].duplicated = duplicated;
        }
        return links;
    };

    _hasEmptyValues(links){
        let count = 0;
        let empty = 0;
        for (let i=0; i<links.length; i++){
            if (!links[i].toDelete){
                count += 1;
                if (!links[i].value || !links[i].title) empty +=1;
            }
        }
        if (empty){
            if (empty === 1 && count ===1){
                return false;
            }
            return true;
        }
        return false;
    }
}