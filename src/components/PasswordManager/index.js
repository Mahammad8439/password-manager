import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    isShow: false,
    search: '',
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onDeleteBtn = id => {
    this.setState(prev => ({
      passwordList: prev.passwordList.filter(each => each.id !== id),
    }))
  }

  noPasswords = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p>No Passwords</p>
    </div>
  )

  onSubmitPassword = event => {
    event.preventDefault()
    const {websiteInput, userNameInput, passwordInput} = this.state

    const addNewPassword = {
      id: v4(),
      websiteName: websiteInput,
      userName: userNameInput,
      password: passwordInput,
    }

    this.setState(prev => ({
      passwordList: [...prev.passwordList, addNewPassword],
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
      search: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  render() {
    const {
      passwordList,
      websiteInput,
      userNameInput,
      passwordInput,
      isShow,
      search,
    } = this.state

    const filterList = passwordList.filter(each =>
      each.websiteName.toLowerCase().includes(search.toLowerCase()),
    )
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-password-container">
          <div className="add-password-card">
            <h1 className="new-password-heading">Add New Password</h1>
            <form onSubmit={this.onSubmitPassword}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo-img"
                />
                <hr className="separator" />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo-img"
                />
                <hr className="separator" />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter UserName"
                  value={userNameInput}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo-img"
                />
                <hr className="separator" />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="password-container">
          <div className="password-history-top-heading-container">
            <div className="password-heading-container">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="counter">{passwordList.length}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo-img"
              />
              <hr className="separator" />
              <input
                type="search"
                className="input"
                placeholder="Search"
                value={search}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr className="divide" />
          <div className="password-store-container">
            <label className="label">
              <input type="checkbox" onChange={this.showPassword} />
              Show passwords
            </label>
            {filterList.length === 0 ? (
              this.noPasswords()
            ) : (
              <ul className="list-item-container">
                {filterList.map(eachPassword => (
                  <li className="list-item" key={eachPassword.id}>
                    <div className="profile">
                      {eachPassword.websiteName[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="user-details">{eachPassword.websiteName}</p>
                      <p className="user-details">{eachPassword.userName}</p>
                      {!isShow ? (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars"
                        />
                      ) : (
                        <p className="user-details">{eachPassword.password}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="delete-button"
                      data-testid="delete"
                      onClick={() => this.onDeleteBtn(eachPassword.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="search-logo-img"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
