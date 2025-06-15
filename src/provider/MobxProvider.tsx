import React from 'react'
import RootStore from './RootStore';

const storesContext = React.createContext<RootStore | null>(null);

type Props = {
    children: React.ReactNode
}

const MobxProvider = (props: Props) => {
    const rootStore = new RootStore();

    return (
        <storesContext.Provider value={rootStore}>
            {props.children}
        </storesContext.Provider>
    )
}

export default MobxProvider

export const useStores = (): RootStore => {
    const store = React.useContext(storesContext);
    if (!store) {
        throw new Error('useStores must be used within a MobxProvider');
    }
    return store;
};