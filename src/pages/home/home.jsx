import { useState } from "react";
import Filter from "../../components/filter/filter";
import FilteredDataView from "../../components/filteredDataView";
import './home.css'

const Home = () => {
    const [filters, setFilters] = useState({ place: false, event: false });

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
    <div className="row flex-grow-1">
      <aside className="col-md-3 bg-light p-3 border-end">
        <div className="sidebar-header text-center mb-4">
          <img 
            src="../../../assets/logo-v2.png"
            alt="App Logo" 
            className="logo" 
            style={{ width: '100px', height: '100px' }}
          />
          <h1 className="app-name">PraguePulse</h1>
        </div>
        
        <Filter onFilterChange={setFilters} />
      </aside>
      <main className="col-md-9 p-4 bg-white overflow-auto">
        <FilteredDataView filters={filters} />
      </main>
    </div>
  </div>
  );
};
    
    export default Home;
