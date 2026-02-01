
const Greeting = ({age, name, family}) => {
    return (
        <div className=''>
            Greeting
            <div>
            {age}, {name}
            </div>
            <div>
            {family}
            </div>
        </div>
    )
};

export default Greeting;