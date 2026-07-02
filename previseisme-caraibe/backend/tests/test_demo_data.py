from app.connectors.demo_data import get_demo_events, get_demo_sources_health


def test_demo_events_are_sorted_desc_by_time():
    events = get_demo_events()
    assert len(events) > 0
    times = [e.time_utc for e in events]
    assert times == sorted(times, reverse=True)


def test_demo_events_have_valid_magnitude_range():
    for event in get_demo_events():
        assert 0 <= event.magnitude <= 10


def test_demo_sources_health_covers_all_four_sources():
    codes = {s.code.value for s in get_demo_sources_health()}
    assert codes == {"USGS", "EMSC", "IPGP", "FDSN"}
