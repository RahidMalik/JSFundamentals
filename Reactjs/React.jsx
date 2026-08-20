// React
// 1. Reconciliation kya hai ?
//     2. Unnecessary re - rendering ko kaise prevent karein ?
//         3. Global states ko kaise manage karein ?
//             4. CSR aur SSR kya hain ?
//                 5. Large React list ko optimize kaise karein ?
//                     6. Large React project ki structure kaisi hoti hai ?
//                         7. Form performance issue ko kaise handle karein ?
//                             8. useEffect aur useLayoutEffect mein farq ?
//                                 9. React mein code splitting implementation
// 10. React mein error boundaries kaise handle karein ?
//     11. Agar request server ko send ho aur user route change kar de to request cancel kaise karein ?
//         12. useRef kab use karte hain ?
//             13. React component lifecycle kya hai ?
//                 14. React mein StrictMode kya hai ?
//                     15. Higher Order Component kya hai ?
//                         16. Custom Hooks kya hain ?
//                             17. Controlled aur Uncontrolled component mein farq ?
//                                 18. Automatic Batching kya hai ?
//                                     19. useTransition(slow UI updates handle karna) kya hai ?
//                                         20. useDeferredValue kya hai ?
//                                             21. Hydration kya hai ?
//                                                 22. Debouncing kya hai ?


//! 1. Reconciliation kya hai ?
// - React ka algorithm jo Virtual DOM ki previous aur current tree ko compare karta hai aur minimum DOM updates nikalta hai(diffing).
//    - Heuristics: element type same → props update; type different → purana subtree destroy, naya bana; keys ki wajah se list items ko efficiently move / replace / delete karta hai.

//! 2. Unnecessary re - rendering ko kaise prevent karein ?
//    - React.memo(functional components) ya PureComponent(class) → shallow prop / state comparison.
//    - useCallback aur useMemo → callback / memoized value ki nayi reference na bane.
//    - Props ko primitive ya immutable objects ke roop mein bhejiye; object / array ko inline na banayein.
//    - context ke liye context.provider ki value ko memoize karke avoid karo unnecessary consumer re‑render.

//! 3. Global states ko kaise manage karein ?
//    - Context API(theme, auth, locale) – small‑to‑medium state ke liye.
//    - Redux / Redux Toolkit – large, complex, time‑travelling debugging ke liye.
//    - Zustand, Jotai, Recoil – lightweight alternatives.
//    - React Query / TanStack Query – server‑state(cache, background refetch) ke liye

//! 4. CSR aur SSR kya hain ?
//    - CSR(Client‑Side Rendering) : HTML initially empty(ya minimal), JS bundle load hota hai, phir React DOM mount karta hai → jaldi interactive but SEO‑dabba.
//    - SSR(Server‑Side Rendering): Server par React component ko render kar ke complete HTML bhejta hai → fast FCP, SEO‑friendly, phir client‑side hydration hoti hai(event listeners attach).
//    - Next.js(pages / app router) dono modes support karta hai(SSG, ISR, SSR).

//! 5. Large React list ko optimize kaise karein ?
// 1. Large React List Ko Optimize Kaise Karein ?
//     Problem : Agar aapke paas 10,000 items ki list hai aur aap ne sab ko map() karke render kar diya, toh browser ke andar 10,000 HTML elements ban jayenge.Is se aapki app lag karegi, scroll atak atak kar chalega aur mobile devices hang ho jayenge.

// Isko solve karne ke 3 main tareeqay hain:

// A.Virtualization(Ya Windowing) - Sab Se Best Tareeqa
// Yeh sab se powerful technique hai.

// Concept: Agar screen par ek waqt mein sirf 10 items nazar aa sakte hain, toh background mein sirf unhi 10 items(aur thode uper / neeche ke buffer items) ko render karo.Jaise jaise user scroll karta jaye, unhi 10 HTML elements ka data change karte jao. (Yani 10,000 ki list mein DOM mein sirf ~15 elements hi rahenge).

// Library: Is kaam ke liye khud code likhne ke bajaye hum libraries use karte hain: react - window ya react - virtualized.

// Analogy: Sochein ek bohot lamba banner hai, lekin aap ek choti si khidki(window) se dekh rahe hain.Aapko sirf wahi hissa dikhega jo khidki ke samne hai.

// B.Infinite Scrolling & Pagination
// Server se saare 10,000 items ek sath mangwane ke bajaye, chunks(hisson) mein data mangwayein.
// C.Sahi key Prop Ka Istemal
// List mein map karte waqt hamesha unique ID ko key banayein(jaise key = { user.id }).Kabhi bhi array ke index ko key na banayein, warna list mein naya item add ya delete karne par React poori list ko faltu mein re - render kar dega.

import React from 'react';
import { FixedSizeList as List } from 'react-window';

// 1. Fake 10,000 items ka array banaya
const items = Array.from({ length: 10000 }, (_, index) => ({
    id: index + 1,
    title: `Item #${index + 1} - Product Data`,
}));

// 2. Row Component: Har single item ko render karne wala function
// ⚠️ IMPORTANT: 'style' prop pass karna aur element par lagana lazmi hai!
const Row = ({ index, style }) => {
    const item = items[index];

    return (
        <div
            style={{
                ...style, // react-window position: absolute aur top positioning ishi style se lagata hai
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Alternating row colors
            }}
        >
            <strong>ID: {item.id}</strong> &nbsp;- {item.title}
        </div>
    );
};

// 3. Main Virtualized List Component
export default function LargeListExample() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>10,000 Items (Virtualized List)</h2>

            <List
                height={400}            // Scrollable window ki height (in pixels)
                itemCount={items.length} // Total items (10,000)
                itemSize={50}           // Har row ki height (50px)
                width={350}             // List container ki width
            >
                {Row}
            </List>
        </div>
    );
}

//! 6. Large React Project Ki Structure Kaisi Hoti Hai?
// src /
//  ├── assets /          # Images, fonts, SVG icons
//  ├── components /      # "Global" UI components(Button, Modal, Input) jo har jagah use honge
//  ├── config /          # Environment variables, Firebase setup, constants
//  ├── hooks /           # Custom reusable hooks(e.g., useClickOutside, useAuth)
//  ├── layouts /         # Page ke structures(e.g., DashboardLayout, AuthLayout)
//  ├── pages /           # Routing ke hisab se main pages(Home, Login, Dashboard)
//  ├── routes /          # React Router ki configuration
//  ├── services /        # API calls, Axios interceptors(Backend se baat karne wala logic)
//  ├── store /           # Redux / Zustand ka global state setup
//  ├── utils /           # Helper functions(e.g., formatDate, calculateTax)
//  │
//  └── features /        # 🔥 SAB SE IMPORTANT FOLDER(Feature - Based Modules)
//       ├── auth /
//       │    ├── components /    # Sirf auth se related components(LoginForm)
//       │    ├── hooks /         # Sirf auth ke hooks(useLogin)
//       │    └── api /           # Auth ki API calls
//       │
//       ├── products /
//       │    ├── components /    # Sirf products ke components(ProductCard)
//       │    ├── hooks /
//       │    └── api /

//! 7. Form performance issue ko kaise handle karein ?

// 🛠️ Form Performance Optimize Karne Ke 4 Solutions
// 1. React Hook Form Use Karein(Industry Standard 🏆)
import { useForm } from 'react-hook-form';

function FastForm() {
    const { register, handleSubmit } = useForm();

    // Typing par 0 re-renders honge!
    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input {...register("firstName")} />
            <input {...register("lastName")} />
            <button type="submit">Submit</button>
        </form>
    );
}

// Single Isolated Input Component
const IsolatedInput = React.memo(({ label, onSave }) => {
    const [value, setValue] = useState(''); // State sirf is input ke andar isolated hai

    return (
        <div>
            <label>{label}</label>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => onSave(value)} // Parent ko sirf tab update bhejo jab focus hate
            />
        </div>
    );
});

function UncontrolledForm() {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Direct DOM se value nikal li, 0 re-renders hue
        console.log({
            name: nameRef.current.value,
            email: emailRef.current.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input ref={nameRef} type="text" />
            <input ref={emailRef} type="email" />
            <button type="submit">Submit</button>
        </form>
    );
};

//! 8. useEffect aur useLayoutEffect mein farq ?
// React 99% kaam useEffect se hi karta hai, lekin 1% jagah par flicker (UI ke hilne) se bachne ke liye useLayoutEffect use hota hai.

//! 9. React mein code splitting implementation
// 🔑 Code Splitting Ke 2 Main Pillars
// React mein code splitting implement karne ke liye 2 cheezein built -in milti hain:

// React.lazy(): Normal import ke bajaye component ko dynamically load karne ke liye use hota hai.

// < Suspense >: Jab tak backend se woh specific code chunk download ho raha hai, tab tak user ko Loading Spinner / Skeleton dikhane ke liye use hota hai.

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages ko lazy load kiya (Inka alag JS chunk banega)
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading Fallback Component
const PageLoader = () => <div className="spinner">Loading Page...</div>;

function App() {
    return (
        <Router>
            {/* Suspense hona lazmi hai lazy loaded components ke gird */}
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
//! 10. React mein error boundaries kaise handle karein?

// Error Boundary ek aisa special React component hota hai jo apne neeche wale child components ke JavaScript errors ko catch kar leta hai, unhein log karta hai, aur poori app crash hone ke bajaye ek Fallback UI(jaise "Something went wrong! Please refresh.") dikhata hai.

import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // 1. Error aane par state change karke fallback UI trigger karta hai
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // 2. Error ko log karne ke liye use hota hai
    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
        // Yahan aap Sentry ya kisi logging service ko data bhej sakte hain
    }

    render() {
        if (this.state.hasError) {
            // Custom Fallback UI
            return (
                <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                    <h2>⚠️ Something went wrong!</h2>
                    <p>Please refresh the page or contact support.</p>
                </div>
            );
        }

        // Agar koi error nahi hai, toh normal child components render honge
        return this.props.children;
    }
}

export default ErrorBoundary;
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import UserProfile from './UserProfile';
import ProductList from './ProductList';

function App() {
    return (
        <div>
            <h1>My App</h1>

            {/* Ek Component ko alag se wrap karein taake agar isme issue aaye toh baki app chalti rahe */}
            <ErrorBoundary>
                <UserProfile />
            </ErrorBoundary>

            <ErrorBoundary>
                <ProductList />
            </ErrorBoundary>
        </div>
    );
}

export default App;

// & 📦 Modern Solution: react - error - boundary Library
// Agar aap Class Component nahi likhna chahte, toh industry mein popular npm package react - error - boundary use kiya jata hai jo Functional Components aur Hooks ke sath perfectly kaam karta hai:

import { ErrorBoundary } from 'react-error-boundary';

function FallbackComponent({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            <MyBuggyComponent />
        </ErrorBoundary>
    );
}
//! 11. Agar request server ko send ho aur user route change kar de to request cancel kaise karein ?
import { useEffect, useState } from 'react';

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // 1. AbortController ka ek naya object banayein
        const controller = new AbortController();

        // 2. Us object se ek 'signal' nikalein
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                // 3. Fetch request ke options mein us signal ko attach kar dein
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    signal: signal
                });

                const result = await response.json();
                setData(result);

            } catch (error) {
                // 5. Agar request cancel hoti hai toh JavaScript ek error throw karta hai
                // Humein check karna hoga ke error cancellation ka hai ya asal API fail hui hai
                if (error.name === 'AbortError') {
                    console.log('❌ Request raaste mein hi cancel kar di gayi kyunki user ne route change kiya!');
                } else {
                    console.error('⚠️ Koi aur error aagaya:', error);
                }
            }
        };

        fetchData();

        // 4. CLEANUP FUNCTION (The Magic Happens Here)
        // Jab user is page se wapas jayega ya route change karega toh yeh chalega
        return () => {
            controller.abort(); // Yeh direct browser network tab mein request ko 'canceled' kar dega
        };

    }, []); // Empty array means runs on mount

    return (
        <div>
            <h2>Dashboard Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Dashboard;

import axios from 'axios';
import { useEffect } from 'react';

function Profile() {
    useEffect(() => {
        const controller = new AbortController();

        axios.get('https://api.example.com/user', {
            signal: controller.signal // Signal attach kiya
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            if (axios.isCancel(error)) {
                console.log('❌ Axios Request Canceled!');
            }
        });

        // Route change hone par cancel
        return () => {
            controller.abort();
        };
    }, []);

    return <div>Profile Page</div>;
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Ek central store banaya jahan saara API data cache hoga
const queryClient = new QueryClient();

function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}
//! 12. useRef kab use karte hain ?

import { useRef } from 'react';

function FocusInput() {
    const inputRef = useRef(null);

    const handleClick = () => {
        // input pe focus kar do
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Yahan type karo" />
            <button onClick={handleClick}>Input pe Focus Karo</button>
        </div>
    );
}
// Samjho:
// ref = { inputRef } se input element ko inputRef se jod diya.
// Button dabate hi inputRef.current.focus() se uspe focus aa jata hai.

import { useRef, useState } from 'react';

function TimerExample() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = () => {
        // pehle se koi timer chal raha ho to clear kar do
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}
// Samjho:
// setInterval ka ID intervalRef mein rakha.
// Isse re - render nahi hota, lekin baad mein clearInterval kar sakte ho.
import { useRef, useEffect, useState } from 'react';

function PreviousValue() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();

    useEffect(() => {
        // har render ke baad current count ko previous mein save kar do
        prevCountRef.current = count;
    });

    return (
        <div>
            <p>Current: {count}</p>
            <p>Previous: {prevCountRef.current}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}

// In teen examples se almost saari common uses cover ho jati hain.
// Koi specific example chahiye(jaise video control, scroll, etc.) to batao, main uska bhi de dunga.
//! 13. React Component Lifecycle kya hai ?

// Mounting(Component pehli baar screen pe aata hai)
// Updating(Props ya State change hone pe dobara render hota hai)
// Unmounting(Component screen se hat jata hai)

useEffect(() => {
    // Mount + Update
    return () => {
        // Unmount (cleanup)
    };
}, [dependencies]);

// Kab use hota hai ?
// API call, event listeners, timers, subscriptions wagaira manage karne ke liye.

//! 14. React mein StrictMode kya hai ?
// StrictMode ek development tool hai jo React deti hai.

// Potential problems detect karta hai
// Deprecated methods ka warning deta hai
// Components ko double render karta hai (taake side effects saaf dikhein)
// Unsafe lifecycle methods pakadta hai

import { StrictMode } from 'react';

<StrictMode>
    <App />
</StrictMode>

//! 15. Higher Order Component(HOC) kya hai ?
// 1. THE REAL - WORLD ANALOGY 🦸‍♂️
// HOC ek "Iron Man Suit Factory" ki tarah hai.

// Sochein ek aam insaan hai, Tony Stark(aapka Normal Component).Uske paas apne aam kaam karne ki salahiyat hai.Ab aap chahte hain ke usay udne(flying) aur lasers shoot karne ki powers mil jayein.Bajaye iske ke aap uske jism ki surgery karein(yani component ka code change karein), aap usay ek "Armor Suit Factory" mein bhejte hain.

// Yeh Factory Tony Stark ko andar leti hai, usay ek jaded suit(extra logic / props) pehnati hai, aur bahar ek Super Hero(Enhanced Component) nikal aata hai.

// Programming mein, HOC ek aisi function hoti hai jo argument mein ek Component leti hai, usme kuch Extra Powers(Data ya Logic) dalti hai, aur ek Naya Upgrade Component return kar deti hai.

// 🧑 NORMAL COMPONENT(e.g., DashboardPage)
//                  │
//                  ▼
//  🏭 THE HOC FACTORY(e.g., withAuth function)
//  │   ├── Check: Kya user logged in hai ?
//  │   └── Inject Power: User ki details(Name, Email) nikal kar tayar karo
//                  │
//                  ▼
//  🦸 ENHANCED COMPONENT
//     (DashboardPage + Login Check Logic + User Details Prop)

import React from 'react';

// 1. THE HOC FACTORY (Armor Suit Maker)
const withSuperPower = (WrappedComponent) => {
    // Yeh ek naya component return karta hai
    return (props) => {
        const magicPower = "Main hawa mein ud sakta hoon!"; // Extra logic

        // Purane props (...props) aur nayi magicPower dono de kar component return kiya
        return <WrappedComponent {...props} power={magicPower} />;
    };
};

// 2. THE NORMAL COMPONENT (Aam Insaan)
const Hero = (props) => {
    return <h2>Mera naam {props.name} hai, aur {props.power}</h2>;
};

// 3. APPLYING THE HOC (Factory mein bhejna)
const SuperHero = withSuperPower(function HeroNoOne(props) {
    return <h1> My name is {props.name} and i have {props.power}  </h1>
});
export default function App() {
    <SuperHero name='Superman' />
};
//output: Mera naam Superman hai, aur Main hawa mein udd sakta hoon!
// Ab jab aap App mein <SuperHero name="Iron Man" /> likhenge,
// Toh output aayega: "Mera naam Iron Man hai, aur Main hawa mein ud sakta hoon!"

//!controlled and uncntrolled components
// 1. Controlled Component(React State)

function ControlledForm() {
    const [name, setName] = useState('');

    return (
        <div>
            {/* Value direct state se bound hai */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Live Name: {name}</p>
        </div>
    );
}
export default ControlledForm;

// 2. Unconrolled components(useRef)
function App() {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Submitted Name: " + inputRef.current.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                ref={inputRef}
            />
            <button type='submit'></button>
            <p>{inputRef.current}</p>
        </form>
    )
}
export default App;

//! Props Drilling
// 1. TOP COMPONENT (Data yahan hai)
function App() {
    const username = "Rahid Malik";
    return <Parent username={username} />;
}

// 2. INTERMEDIATE COMPONENT (Data use nahi kar raha, sirf pass kar raha hai)
function Parent({ username }) {
    return <Child username={username} />;
}

// 3. INTERMEDIATE COMPONENT (Yeh bhi sirf pass kar raha hai)
function Child({ username }) {
    return <GrandChild username={username} />;
}

// 4. DEEP CHILD COMPONENT (Data asliyat mein yahan chahiye tha)
function GrandChild({ username }) {
    return <h1>Welcome, {username}! 👋</h1>;
}

//& instead of using it use ContextApi and useContext().
import { createContext } from 'react';

// Central Store Create Kiya (Initial Value optional hoti hai)
export const UserContext = createContext(null);
//& Step 2: Provider Mein App Wrap Karein (App.jsx)
import React, { useState } from 'react';
import { UserContext } from './UserContext';
import Parent from './Parent';

export default function App() {
    const [user, setUser] = useState("Rahid Malik");

    return (
        // 🎁 Is Provider ke andar jitne bhi components hain, sab data read kar sakte hain
        <UserContext.Provider value={{ user, setUser }}>
            <Parent />
        </UserContext.Provider>
    );
}
//& Step 3: Deep Child Mein Consume Karein(DeepChild.jsx)
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default function DeepChild() {
    // Direct UserContext se data nikal liya (Bina Props Drilling ke)
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <h2>User Name: {user}</h2>
            <button onClick={() => setUser("Ali Express")}>Name Change Karein</button>
        </div>
    );
};
