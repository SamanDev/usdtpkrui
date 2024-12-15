import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Grid,
} from "semantic-ui-react";
import Moment from "react-moment";
import { addDays } from "date-fns";
const moment = require("moment");
import AmountColor from "../../../utils/AmountColor";
import {
  adminGetService,
  adminPutService,
  adminPostService,
} from "../../../services/admin";
import { Alert } from "../../../utils/alerts";
import AddCashier from "../AddBot";
import CheckboxToggle from "../utils/toggle";
import AddCredit from "../AddCredit";

import { haveAdmin, haveModerator, doCurrency } from "../../../const";

const conditionalRowStyles = [
  {
    when: (row) => row.endBalance < row.startBalance,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.endBalance > row.startBalance,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
];

const noDataComponent = (
  <div
    style={{
      minHeight: 300,
      position: "relative",
      marginTop: 20,
      width: "100%",
      zIndex: 0,
    }}
  >
    <Dimmer active inverted>
      <div
        style={{
          textAlign: "center",
          color: "rgba(0,0,0,.5)",
          paddingTop: 30,
          width: "100%",
        }}
      >
        <Icon size="huge" color="grey" name="list ul" />
        <h4>Empty List.</h4>
      </div>
    </Dimmer>
  </div>
);

const FilterComponent = ({
  filterText,
  onFilterOk,
  onFilter,
  onClear,
  setExMode,
}) => (
  <>
    <Input
      icon="search"
      placeholder="Search..."
      id="search"
      type="text"
      aria-label="Search Input"
      className="float-end"
      value={filterText}
      onChange={onFilter}
      onBlur={onFilterOk}
    />
  </>
);
const updateUserObj = async (e, data) => {
  var _key = data.userkey;
  var curU = JSON.parse(JSON.stringify(data.user));
  var values = { id: curU.id, key: _key, value: data.checked };

  try {
    const res = await adminPutService(values, "updateUserByAdmin");
    if (res.status == 200) {
      if (res.data?.address) {
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
  } catch (error) {
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);

  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");

  const [selectedList, setSelected] = useState([]);
  const [getwaysList, setGetwaysData] = useState([]);
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [footerTxt, setFooterTxt] = useState("");
  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const [cashierOpen, setCashierOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChangeSearch = (e, { value }) => {
    setDataSearch(value);
  };
  const handleChangeLogin = (e, { value }) => {
    setDataLoginDay(value);
  };

  const fetchUsers = async (page) => {
    var _name = prop.search;
    var _val = prop.searchValue;
    var _contain = true;

    setLoading(true);
    try {
      const res = await adminGetService(`getBots`);
      if (res.status === 200) {
        setData(res.data);

        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const AddCredit = async () => {
    setLoading(true);
    try {
      const res = await adminPostService({}, `addChipBots`);
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  var filteredItems = data.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );
  if (dataLoginDay) {
    var startDate = addDays(new Date(), dataLoginDay);

    filteredItems = data.filter((item) => {
      var _Date = new Date(item.lastLogin);
      return _Date <= startDate;
    });
  }

  const [firstOpen, setFirstOpen] = React.useState(false);
  const contextActions = React.useMemo(() => {
    return <Button onClick={() => setFirstOpen(true)}>Gift</Button>;
  }, [data]);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
    var newSelect = [];
    {
      selectedRows.map((user, i) => {
        var newUser = user;

        newSelect.push(newUser);
      });
    }
    setSelected(newSelect);
  };

  const handleGetGeteways = async () => {
    if (getGateways) {
      setGetwaysData(getGateways);
    } else {
      setLoading(true);
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setGetwaysData(sorted);
        }
      } catch (error) {
        //console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleGetGeteways();
  }, []);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },

    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username)}
          >
            {row.username}
          </span>
        </>
      ),
      sortable: true,
      width: "180px",
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => <>{doCurrency(row.amount)}</>,
      sortable: true,
    },
    {
      name: "Rake",
      selector: (row) => row.totalRake,
      format: (row) => (
        <span
          onClick={() => {
            setObj(row);
            setCashierOpen(true);
          }}
        >
          {doCurrency(row.totalRake)}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Total",
      selector: (row) => row.total,
      format: (row) => (
        <>
          <AmountColor amount={row.total} sign={row.total} />
        </>
      ),
      sortable: true,
    },
  ];
  const gettotal = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.amount != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.amount;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const getusers = (data, status, target) => {
    var _data = data;
    var _totalReward = [];
    {
      _data.map((x, i) => {
        var _am = x.amount;

        _totalReward.push("" + x.username + "");
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal2 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.totalRake != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.totalRake;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal3 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.total != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.total;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };

  const getDesc = (link, ftxt) => {
    ftxt = ftxt + "@" + link.toUpperCase() + "@";
    console.log(getusers(filteredItems, "Done", "total"));
    if (doCurrency(gettotal(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "credit (" +
        doCurrency(gettotal(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    if (doCurrency(gettotal2(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "rake (" +
        doCurrency(gettotal2(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal2(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    if (doCurrency(gettotal3(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "total (" +
        doCurrency(gettotal3(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal3(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }

    ftxt = ftxt + "@";
    return ftxt;
  };
  useEffect(() => {
    var ftxt = "";
    if (filteredItems.length) {
      var link = "Total";
      ftxt = getDesc(link, ftxt);
    }
    setFooterTxt(ftxt);
  }, [filteredItems, data]);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <Grid verticalAlign="middle" columns={2} as={Segment} color="red">
          <Grid.Row>
            <Grid.Column>
              <h1>{prop.searchValue}</h1>
            </Grid.Column>
            <Grid.Column>
              <Button color="red" onClick={() => fetchUsers(1)}>
                Reload
              </Button>
              <Button
                color="blue"
                className="float-end"
                onClick={() => setCashierOpen(true)}
              >
                Add
              </Button>

              <Button color="red" onClick={() => AddCredit()}>
                AddCredit to All
              </Button>

              <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [filterText, resetPaginationToggle, data, selectedList]);

  if (loading) {
    return (
      <>
        <Segment
          basic
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  return (
    <>
      <Modal
        onClose={() => {
          setFirstOpen(false);
          fetchUsers(1);
        }}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCredit selectedList={selectedList} />
      </Modal>
      <Modal
        onClose={() => {
          setCashierOpen(false);
          fetchUsers(1);
        }}
        onOpen={() => setCashierOpen(true)}
        open={cashierOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCashier obj={obj} setCashierOpen={setCashierOpen} />
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        {subHeaderComponentMemo}
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationPerPage={perPage}
          defaultSortFieldId={dataSortedID}
          defaultSortAsc={false}
          expandOnRowClicked={true}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          contextActions={contextActions}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
        <Segment inverted>
          {footerTxt.split("@").map((item, key) => {
            return (
              <div key={key}>
                {item}
                <br />
              </div>
            );
          })}
        </Segment>
      </div>
    </>
  );
}

export default Admin;
