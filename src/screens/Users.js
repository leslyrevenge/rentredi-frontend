import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { create, setMaster, read, drop } from "../redux/actions/master";
import Form from "./form";
import UserList from "./list";
import { Row, Col, Drawer } from "antd";
import getUserLocation from "../utils/window";

export const Users = (props) => {
  const [loading, setloading] = useState();
  const [open, setOpen] = useState();
  const [currentDetail, setCurrentDetail] = useState();
  const [editing, setEditing] = useState();

  useEffect(() => {
    const fetchUserList = async () => {
      await props.read({
        key: "users",
        replace: true,
      });
    };
    fetchUserList();
  }, [props]);

  const currentDetailGenerator = () => {
    let output = <div key={"no_data"}>No Data</div>;
    if (currentDetail) {
      // normally I wouldn't do this
      let detail = { ...currentDetail };
      delete detail.raw;
      let entries = Object.entries(detail);
      output = entries.map((entry, i) => {
        return (
          <div key={i}>
            <div style={{ fontWeight: "bold" }}> {entry[0]}</div>
            <div>{entry[1]}</div>
          </div>
        );
      });
    }
    return output;
  };

  const onFinish = async (input) => {
    setloading(true);
    try {
      await getUserLocation(props.setMaster);
      let { latitude, longitude } = props.user_current_position || {};
      const payload = {
        ...input,
        lng: longitude,
        lat: latitude,
        id: editing && editing.id,
      };

      await props.create({
        key: "user",
        dispatch_key: "users",
        payload,
        update_state: true,
      });
    } catch (error) {
      // todo: log error
    }
    setloading(false);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onDetail = (input) => {
    setCurrentDetail(input);
    setOpen(true);
  };
  const onEdit = (input) => {
    setEditing(input);
    return input;
  };
  const onDelete = async (id) => {
    props.drop({
      key: "user",
      params: [id],
      dispatch_key: "users",
    });
  };

  const page_header = editing ? "Update User" : "Create User";
  return (
    <Row gutter={24}>
      <Col span={18}>
        <Row>
          <Col span={16}>
            <UserList
              onDetail={onDetail}
              onEdit={onEdit}
              onDelete={onDelete}
              data={props.users}
            />
          </Col>
          <Col span={8}>
            <h1>{page_header}</h1>
            <Form values={editing} onFinish={onFinish} loading={loading} />
            {editing && (
              <div style={{ cursor: "pointer" }} onClick={() => onEdit()}>
                cancel editing
              </div>
            )}
          </Col>
        </Row>
      </Col>
      <Drawer
        title={currentDetail && currentDetail.fullname}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div>{currentDetailGenerator()}</div>
      </Drawer>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  users: state.master.users,
  user_current_position: state.master.user_current_position,
});

const mapDispatchToProps = { create, setMaster, read, drop };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
