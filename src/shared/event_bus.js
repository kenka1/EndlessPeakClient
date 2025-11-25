export const eventBus = {
    events: {},

    on(event, callback) {
        (this.events[event] ||= []).push(callback);
    },

    off(event, callback) {
        this.events[event] =
            (this.events[event] || []).filter(fn => fn !== callback);
    },

    emit(event, data) {
        (this.events[event] || []).forEach(fn => fn(data));
    }
};