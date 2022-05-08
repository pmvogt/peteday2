/** @jsxImportSource theme-ui */
import React, {useState, createContext, useCallback} from "react";
import useLocalForage from "../hooks/use-local-forage";
import propTypes from "prop-types";
import {assocPath, compose, not, path} from "ramda";

export const AchievementContext = createContext({
    completed: {},
    backlogged: {},
})

const AchievementProvider = ({ children }) => {
    const [achievementData, setAchievementData, unsetAchievementData, achievementDataLoaded] =
        useLocalForage('achievement-context', {
            completed: {},
            backlogged: {}
        });

    const toggleBacklogged = useCallback(
        compose(
            setAchievementData,
            (id) => assocPath(
                ['backlogged', id.toString()],
                compose(
                    not,
                    path(['backlogged', id.toString()])
                )(achievementData)
            )(achievementData)
        ), [setAchievementData, achievementData]
    )

    const toggleCompleted = useCallback(
        compose(
            setAchievementData,
            (id) => assocPath(
                ['completed', id.toString()],
                compose(
                    not,
                    path(['completed', id.toString()])
                )(achievementData)
            )(achievementData)
        ), [setAchievementData, achievementData]
    )


    return (
        <AchievementContext.Provider
            value={{
                data: achievementData,
                setData: setAchievementData,
                unsetData: unsetAchievementData,
                loaded: achievementDataLoaded,
                toggleCompleted,
                toggleBacklogged,
            }}
        >
            {children}
        </AchievementContext.Provider>
    );
};

AchievementProvider.displayName = 'AchievementProvider';
AchievementProvider.propTypes = {
    children: propTypes.any,
};
export default AchievementProvider;
