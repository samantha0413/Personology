import React, { useEffect, useState } from "react"
import { Tabs, Tab, Button } from "react-bootstrap"
import quoteApi from '../../Api/quote-api'
import QuoteApprovalCard from '../../components/QuoteApprovalCard'
import accountApi from '../../Api/account-api'
import ManageAccountCard from '../../components/ManageAccountCard'
import moment from 'moment'

const AdminQuotes = () => {
    // variables that are set and used throughout the page
    const [key, setKey] = useState('home');
    const [needsApproval, setNeedsApproval] = useState(null)
    const [accounts, setAccounts] = useState(null)
    const [type, setType] = useState(null)
    // this runs as soon as the page loads..it removes the id errorPage from the body and also gets all the quotes that have not been approved yet
    useEffect(() => {
        document.getElementsByTagName("body")[0].removeAttribute("id")
        quoteApi.needsApproval().then(data => {
            setNeedsApproval(data.data)
        })
    }, [])
    // this approves or deletes the quote from the database
    const approveDelete = (value, idx, id) => {
        let copyNeedsApproval = needsApproval.slice()
        if (value === "delete") {
            quoteApi.deleteQuoteForever(id).then(data => {
                if (data.status === 200) {
                    copyNeedsApproval.splice(idx, 1)
                    setNeedsApproval(copyNeedsApproval)
                }
            })
        } else if (value === "approve") {
            quoteApi.updateQuoteStatus(id).then(data => {
                if (data.status === 200) {
                    copyNeedsApproval.splice(idx, 1)
                    setNeedsApproval(copyNeedsApproval)
                }
            })
        }
    }
    // this sets the type (all, active, inactive) and also pulls the accounts from the database for whichever button/link is clicked
    const getType = (value) => {
        setType(value)
        let date = moment().subtract(6, 'months').toISOString()
        accountApi.getAllAccounts(value, date).then(data => {
            let account = data.data.filter(account => account.email !== "sam@gmail.com")
            setAccounts(account)
        })
    }
    // allows the admin to delete the account from the database
    const deleteAccount = (id) => {
        accountApi.adminDelete(id).then(data => {
            let deleted = accounts.filter(account => account._id !== `${id}`)
            setAccounts(deleted)
        })
    }
    return (
        <>
            <h1 className="allPageTitles text-center">Admin Page</h1>
            <Tabs
                id="tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="justify-content-center mt-5"
            >
                <Tab eventKey="home" title="Accounts" />
                <Tab eventKey="quotes" title="Quotes" />
            </Tabs>
            {key === "quotes" ? <div>
                {needsApproval.length > 0 ? <div className="d-flex flex-wrap mt-5">
                    {needsApproval.map((quote, idx) => {
                        return <QuoteApprovalCard key={idx} quote={quote.quote} index={idx} id={quote._id} approveDelete={approveDelete} />
                    })}
                </div> : <h1 className="text-center text-white mt-5">No quotes to display</h1>}

            </div>
                : key === "home" ? <div>
                    <div className="text-center mt-5">
                        <Button className="removeResultsLink" value="all" onClick={e => getType(e.target.value)}>All Accounts</Button>
                        <Button className="removeResultsLink" value="active" onClick={e => getType(e.target.value)}>Active Accounts</Button>
                        <Button className="removeResultsLink" value="inactive" onClick={e => getType(e.target.value)}>Inactive Accounts</Button>
                        {(accounts && accounts.length === 0) ? <h1 className="text-white text-center mt-5">No accounts to display.</h1> : ""}
                    </div>
                    {type ? <div className="d-flex flex-wrap mt-5">
                        {(accounts && accounts.length > 0) ? accounts.map((acct, idx) => {
                            return <ManageAccountCard
                                key={idx}
                                account={acct}
                                deleteAccount={deleteAccount}
                            />
                        }) : ""}
                    </div> : ""}
                </div> : ""}
        </>
    )
}

export default AdminQuotes