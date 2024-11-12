import Users from "../Users/users";
import Books from "../Books/books";
import Programs from "../Programs/programs";
import Dashboard from "../Dashboard/dashboard";
import StudentData from "../StudentData/studentData";
import UpcomingPrograms from "../UpcomingPrograms/upcomingPrograms";

export const tabs = [
    { label: 'Dashboard', content: <Dashboard />, icon: <i class="fa-solid fa-house text-xl"></i> },
    { label: 'Student Data', content: <StudentData />, icon: <i class="fa-regular fa-user text-xl"></i> },
    { label: 'Programs', content: <Programs />, icon: <i class="fa-regular fa-rectangle-list text-xl"></i> },
    { label: 'Users', content: <Users />, icon: <i class="fa-solid fa-users text-xl"></i> },
    { label: 'Inventory', content: <Books/>, icon: <i class="fa-solid fa-book text-xl"></i> },
    { label: 'Upcoming Programs', content: <UpcomingPrograms/>, icon: <i class="fa-solid fa-graduation-cap"></i> },
];