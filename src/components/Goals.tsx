import React, { Component } from "react";
import firebase from "firebase";
import GoalCard from "./GoalCard";
import { Scrollbars } from "react-custom-scrollbars";
import "./styles/Goals.css";

type Goal = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>

interface GoalsState {
    goals: Goal[];
}

class Goals extends Component {
    state: GoalsState = {
        goals: [],
    };

    getGoals = () => {
        const db = firebase.firestore();
        const goalsRef = db.collection("goals");

        goalsRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            const newGoals = snapshot.docs.slice();
            this.setState({ goals: newGoals });
        });
    };

    componentDidMount() {
        this.getGoals();
    }
    /*
    editgoal = (event: any) => {
        const edit = this.props.edit;
        const target = event.target;
        console.log(target);
        const db = firebase.firestore();
        const docID = target.getAttribute("eyeDee");
        console.log(docID);
        db.collection("goals")
            .doc(docID)
            .get()
            .then(function (doc) {
                edit(doc);
            });
    };

    deletegoal = (id) => {
        const db = firebase.firestore();

        console.log(id);
        if (this.state.confirmedDelete) {
            console.log("deleting!");
            db.collection("goals")
                .doc(id)
                .delete()
                .then(function () {
                    console.log("Document successfully deleted!");
                })
                .catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            this.setState(
                {
                    confirmedDelete: false,
                    toDelete: undefined,
                    showModal: false,
                },
                () => console.log(this.state)
            );
        } else {
            this.setState({ showModal: true, toDelete: id }, () =>
                console.log("toDelete", this.state.toDelete)
            );
        }
    };
*/

    render() {
        const goalCards = this.state.goals.map((goal) => (
            <GoalCard
                eyeDee={goal.id}
                title={goal.data().title}
                img={goal.data().imgs[0]}
                edit={() => {}} // TODO
                delete={() => {}} // TODO
            />
        ));

        return (
            <>
                <h2>Manage goals</h2>
                <Scrollbars style={{ width: "19rem", maxHeight: "610px" }}>
                    {goalCards}
                </Scrollbars>

                {/* <DeleteModal
                    show={this.state.showModal}
                    confirmDelete={() => {
                        this.setState({ confirmedDelete: true }, () => {
                            console.log("about to delete!");
                            console.log(this.state.confirmedDelete);
                            this.deletegoal(this.state.toDelete);
                        });
                    }}
                    handleClose={() => this.setState({ showModal: false })}
                />  */}
            </>
        );
    }
}

export default Goals;
