import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="min-w-full border h-10 flex items-center justify-between relative bg-white">
            <div className='ml-2'>
                <h1>Navbar</h1>
            </div>

            {/* Desktop Menu */}
            <div className='sm:flex gap-3 mr-2 hidden'>
                <h1>Home</h1>
                <h1>FAQ</h1>
                <h1>About</h1>
            </div>

            {/* Hamburger Button */}
            <div className='sm:hidden pr-4 z-50'>
                <button onClick={() => setOpen(!open)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-40"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="fixed top-0 left-0 flex flex-col bg-black text-white w-[70%] max-w-75 h-screen gap-6 pt-10 pl-6 z-50 shadow-2xl"
                        >
                            <h1 onClick={() => setOpen(false)} className="cursor-pointer">Home</h1>
                            <h1 onClick={() => setOpen(false)} className="cursor-pointer">FAQ</h1>
                            <h1 onClick={() => setOpen(false)} className="cursor-pointer">About</h1>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;